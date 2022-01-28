<template>
    <div>
        <div class="container-search">
            <div class="handle-box">
                <span style="margin-left:20px">专题名</span>
                <el-input v-model="query.name" placeholder="请输入名称" class="mr10"></el-input>
                <span style="margin-left: 20px;">状态</span>
                <el-select v-model="query.address" placeholder="请选择" class="mr10">
                    <el-option key="1" label="已发布" value="已发布" style="font-size: 14px;"></el-option>
                    <el-option key="2" label="未发布" value="未发布" style="font-size: 14px;"></el-option>
                </el-select>
                
                    <el-button id="normal_btn1" type="primary" icon="el-icon-search" style = "margin-left:20px" @click="handleSearch">搜索</el-button>
                    <el-button id="normal_btn" type="primary" icon="el-icon-refresh" style="margin-left:20px" @click="handleSearch">重置</el-button>
                    <router-link to="/topic_new">
                        <el-button
                            type="primary"
                            class="handle-del mr10"
                            style = "margin-right:40px;float:right"
                            icon="el-icon-plus"
                        >添加</el-button>
                    </router-link>                
                
            </div>
        </div>



        <div class="container-table">
            <div class="handle-box">
                <el-table
                    :data="tableData"
                    border
                    class="as_table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column prop="name" label="名称" width=200% ></el-table-column>
                    <el-table-column prop="discription" label="描述" ></el-table-column>
                    <el-table-column prop="model" label="适用车型" width="200"></el-table-column>
                    <el-table-column label="状态" width=100% >
                        <template slot-scope="scope">
                            <el-tag
                                :type="scope.row.state==='已发布'?'success':(scope.row.state==='未发布'?'danger':'')"
                            >{{scope.row.state}}</el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作"   width="300">
                        <template slot-scope="scope">
                            <router-link to="/topic_detail">
                                <el-button
                                    type="text"
                                    @click="handleEdit(scope.$index, scope.row)"
                                    icon ="el-icon-info"
                                >查看详情</el-button>
                            </router-link>
                            <el-button
                                type="text"
                                @click="handleDelete(scope.$index, scope.row)"
                                icon ="el-icon-edit"
                            >编辑</el-button>
                            <el-button
                                type="text"
                                icon="el-icon-close"
                                class="red"
                                @click="handleDelete(scope.$index, scope.row)"
                            >删除</el-button>
                            <el-button
                                v-if="scope.row.state === '未发布'" 
                                icon="el-icon-lx-attention"
                                type="text" 
                            >发布</el-button>
                            <el-button
                                v-if="scope.row.state === '已发布'" 
                                type="text" 
                                icon="el-icon-lx-attentionforbid"
                            >取消发布</el-button>
                        </template>
                    </el-table-column>
                </el-table>
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
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="20%" :show-close="visable">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
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
// import { fetchData } from '../../api/index';
import request from '../../../utils/request';

export const fetchData = query => {
    return request({
        url: './TopicTable.json',
        method: 'get',
        params: query
    });
};

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
                this.pageTotal = res.pageTotal || 10;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
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
}

.handle-select {
    width: 120px;
    /* width: 10%; */
    margin-left: 20px;
    font-size: 16px;
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



.blue {
    color: #409EFF;
}
.gray {
    color: #aaaaaa;
}
.handle-box {
    margin-bottom: 20px;
    margin-top: 20px;
    vertical-align: middle;
}


</style>
