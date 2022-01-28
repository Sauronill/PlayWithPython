<template>
    <div>
        <!--
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> Banner Management
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        -->
         <div class="container-search">
            <div class="handle-box">
                <span style="margin-left:20px">车种</span>
                <el-input v-model="form.name" placeholder="请输入车种" class="mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" style="margin-left:20px;" @click="handleSearch">搜索</el-button>
                <el-button type="primary" icon="el-icon-plus" style="margin-right:40px; float:right" @click="handleAdd">添加</el-button>
            </div>
        </div>

        <div class="container">
            <div class="handle-box">
                <el-table
                    :data="tableData"
                    border
                    class="as_table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column prop="name" label="车种名称" width="200"></el-table-column>
                    <el-table-column prop="description" label="描述"></el-table-column>
                    <el-table-column label="操作" width="500" >
                        <template slot-scope="scope">
                            <el-button
                                type="text"
                                icon="el-icon-info"
                                @click="handleRead(scope.$index, scope.row)"
                            >查看详情</el-button>
                            <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row)"
                            >编辑</el-button>
                            <el-button
                                type="text"
                                icon="el-icon-close"
                                class="red"
                                @click="handleDelete(scope.$index, scope.row)"
                            >删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- Add弹出框 -->
        <el-dialog title="添加车种" :visible.sync="addVisible" width="20%" :show-close="visable">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item >
                    <span slot="label">
                        <span class="must">*</span>
                        <span>车种名称</span>
                    </span>
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input type="textarea" rows="5" v-model="form.description"></el-input>
                    <small>不超过150个汉字或300个字符</small>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>

        <!-- Read弹出框 -->
        <el-dialog title="查看车种" :visible.sync="readVisible" width="20%" :show-close="visable">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="车种名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input type="textarea" rows="5" v-model="form.description"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="readVisible = false">关 闭</el-button>
            </span>
        </el-dialog>

        <!-- Edit弹出框 -->
        <el-dialog title="编辑车种" :visible.sync="editVisible" width="20%" :show-close="visable">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item>
                    <span slot="label">
                        <span class="must">*</span>
                        <span>车种名称</span>
                    </span>
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input type="textarea" rows="5" v-model="form.description"></el-input>
                    <small>不超过150个汉字或300个字符</small>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import { fetchData } from '../../../api/vehicle_kind';
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
            addVisible: false,
            readVisible: false,
            editVisible: false,
            pageTotal: 0,
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
                this.pageTotal = res.pageTotal || 20;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        handleAdd() {
            this.idx = '';
            this.form = '';
            this.addVisible = true;
        },
        saveAdd() {
            this.addVisible = false;
        },
        handleRead(index, row) {
            this.idx = index;
            this.form = row;
            this.readVisible = true;
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                showClose:false,
                type: 'warning'
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
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        }
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

.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
    margin-left: 10px;
}

</style>
