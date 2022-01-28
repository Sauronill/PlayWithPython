<template>
    <div>
        <div class="container-search">
            <div class="handle-box">
                <span style="margin-left:20px">用户名 </span>
                <el-input v-model="query.name" placeholder="请输入用户名" class="mr10"></el-input>

                <span  style="margin-left:20px">用户类型:</span>
                <el-select v-model="query.status" placeholder="请选择" class="mr10">
                    <el-option key="1" label="上架" value="上架"></el-option>
                    <el-option key="2" label="下架" value="下架"></el-option>
                </el-select>

                <span  style="margin-left:20px">用户状态:</span>
                <el-select v-model="query.type" placeholder="请选择" class="mr10">
                    <el-option key="1" label="导航" value="导航"></el-option>
                    <el-option key="2" label="导航" value="导航"></el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-lx-upload"  style = "margin-right:10px;float:right"  >导出数据</el-button>
                <router-link to="/account_new">
                <el-button type="primary"  @click="handleAdd" icon="el-icon-plus" style = "margin-right:10px; float:right">新增用户</el-button>
                </router-link>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch" style = "margin-left:20px" >搜索</el-button>               
                <el-button type="primary" icon="el-icon-refresh" @click="handleReset"  style = "margin-left:20px" >重置</el-button>
                
                
            </div>
        </div>

        <div class="container-table">
            <el-table
                :data="tableData"
                border
                class="as_table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column prop="name" label="用户名" ></el-table-column>
                <el-table-column prop="email" label="邮箱地址" ></el-table-column>
                <el-table-column prop="type" label="用户类型" ></el-table-column>
                <el-table-column prop="status" label="用户状态" ></el-table-column>
                <el-table-column label="操作" width="300">
                    <template slot-scope="scope">
                        <el-button
                            v-if="scope.row.status === '已禁用'" type="text" style = "margin-left:10px"
                            icon = "el-icon-lx-attention"
                            @click="handleEnable(scope.$index, scope.row)"
                        >启用</el-button>
                        <el-button
                            v-if="scope.row.status === '已启用'" type="text" style = "margin-left:10px"
                            icon = "el-icon-lx-attentionforbid"
                            @click="handleDisable(scope.$index, scope.row)"
                        >禁用</el-button>
                        <el-button
                            type="text" style = "margin-left:10px"
                            icon="el-icon-refresh"
                            @click="handleChangePW(scope.$index, scope.row)"
                        >重置密码</el-button>
                        <el-button
                            type="text" style = "margin-left:10px"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="1"
                    :page-size="10"
                    :total="30"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="重置密码" :visible.sync="editVisible" width="20%" :show-close="visable">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item>
                    <span slot="label" align="right">
                            <span style="color:red">*</span>
                            <span>新密码 </span>
                    </span>
                    <el-input placeholder="请输入新密码"></el-input>
                </el-form-item>
                <el-form-item >
                    <span slot="label" align="right">
                            <span style="color:red">*</span>
                            <span>确认密码 </span>
                    </span>
                    <el-input  placeholder="请再次输入新密码"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button  @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="editVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="启用" :visible.sync="enableVisible" width="20%" :show-close="visable" class="dialog">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="启用用户:">
                    <div class="button-blue">{{form.name}}</div>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button  @click="enableVisible = false">取 消</el-button>
                <el-button type="primary" @click="enableVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="禁用" :visible.sync="disableVisible" width="20%" :show-close="visable" class="dialog">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="禁用用户:">
                    <div class="button-blue">{{form.name}}</div>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button  @click="disableVisible = false">取 消</el-button>
                <el-button type="primary" @click="disableVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { fetchData } from '../../../api/index';
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            visable:false,
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            enableVisible: false,
            disableVisible: false,
            pageTotal: 10,
            form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            fetchData(this.query).then(res => {
                console.log(res);
                this.tableData = res.list;
                this.pageTotal = res.pageTotal || 50;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        handleAdd() {
            this.$router.push('/account_new');
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning',
                showClose:false
            })
                .then(() => {
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        // 编辑操作
        handleEdit(index, row) {
            this.$router.push('/account_edit');
            // this.idx = index;
            // this.form = row;
            // this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        },

        handleEnable(index, row) {
            this.idx = index;
            this.form = row;
            this.enableVisible = true;
        },

        handleDisable(index, row) {
            this.idx = index;
            this.form = row;
            this.disableVisible = true;
        },

        handleChangePW(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },

        getEnable(index, row)
        {
            if (row.status === '已启用'){
                return blue;
            } else {
                return gray;
            }
        },
        getDisable(index, row)
        {
            if (row.status === '已启用'){
                return gray;
            } else {
                return blue;
            }
        },
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
    margin-top: 20px;
    vertical-align: middle;
}


.handle-select {
    width: 120px;
}


.red {
    color: #ff0000;
}
.blue {
    color: #0000ff;
}
.button-blue{
    color:#409EFF;
}
.gray {
    color: #aaaaaa;
}
.mr10 {
    margin-right: 10px;
    margin-left: 10px;
}

.table-align{
    margin-right: 0%;
}



</style>

<style >
.dialog .el-dialog__header {

  background: #EBEEF5;

}
</style>

