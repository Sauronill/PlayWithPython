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
                <span style="margin-left:20px">名称</span>
                <el-input v-model="form.name" placeholder="请输入名称" class="mr10" style="margin-left:20px;"></el-input>
                <span style="margin-left:20px">描述</span>
                <el-input v-model="form.name" placeholder="请输入描述" class="mr10" style="margin-left:20px;"></el-input>
                <span style="margin-left:20px">状态</span>
                <el-select v-model="query.address" placeholder="请选择" class="mr10" style="margin-left:20px">
                    <el-option key="1" label="已发布" value="已发布"></el-option>
                    <el-option key="2" label="未发布" value="未发布"></el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch" style="margin-left:20px;">搜索</el-button>   
                <el-button type="primary" icon="el-icon-plus" @click="handleAddBanner" style="margin-right:40px; float:right">添加</el-button>
            </div>
        </div>
        
        
        <div class="container">
            <div class="handle-box">
                <el-table
                    :data="listest"
                    border
                    class="as_table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    @selection-change="handleSelectionChange"
                >
                   
                    <el-table-column prop="brand" label="品牌" width="200"></el-table-column>
                    <el-table-column prop="kind" label="车种"></el-table-column>
                     <el-table-column prop="model" label="车型"></el-table-column>
                    <el-table-column label="状态" width="100" >
                        <template slot-scope="scope">
                            <el-tag
                                :type="scope.row.state==='已发布'?'success':(scope.row.state==='未发布'?'info':'')"
                            >{{scope.row.state}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="500" >
                        <template slot-scope="scope">
                            <el-button
                                type="text"
                                icon="el-icon-info"
                                @click="handleDetail(scope.$index, scope.row)"
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
                            <el-button
                                type="text"
                                v-if="scope.row.state==='未发布'"
                                icon="el-icon-lx-attention"
                                @click="handleRelease(scope.$index, scope.row)"
                            >发布</el-button>
                            <el-button
                                type="text"
                                v-if="scope.row.state==='已发布'"
                                icon="el-icon-lx-attentionforbid"
                                @click="handleUnRelease(scope.$index, scope.row)"
                            >取消发布</el-button>
                            <el-button
                                type="text"
                                @click="handleHistory(scope.$index, scope.row)"
                                icon="el-icon-s-data"
                            >查看发布履历</el-button>
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
        <!-- 发布弹出框 -->
        <el-dialog title="确认发布" :visible.sync="releaseVisible" width="20%" :show-close="visable">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item>
                    <span slot="label">
                        <span class="must">*</span>
                        <span>发布说明</span>
                    </span>
                    <el-input type="textarea" rows="5" v-model="form.desc"></el-input>
                    <small>不超过150个汉字或者300个字符</small>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="releaseVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveRelease">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 取消发布弹出框 -->
        <el-dialog  title="取消发布" :visible.sync="unReleaseVisible" width="20%" :show-close="visable">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item>
                    <span slot="label">
                        <span class="must">*</span>
                        <span>取消说明</span>
                    </span>
                    <el-input type="textarea" rows="5" v-model="form.desc"></el-input>
                    <small>不超过150个汉字或者300个字符</small>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="unReleaseVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveUnRelease">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 查看发布履历弹出框 -->
        <el-dialog title="发布履历" :visible.sync="historyVisible" width="50%" :show-close="visable">
            <el-table
                :data="historytest"
                border
                class="as_table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column prop="user" label="用户名" width="100"></el-table-column>
                <el-table-column prop="time" label="时间" width="200"></el-table-column>
                <el-table-column prop="operation" label="操作" width="200"></el-table-column>
                <el-table-column prop="desc" label="原因"></el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="historyVisible = false">确认</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
const axios = require('axios');
import { fetchData } from '../../../api/banners';
import { fetchData2 } from '../../../api/banners2';
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
            releaseVisible: false,
            unReleaseVisible: false,
            historyVisible: false,
            editVisible: false,
            pageTotal: 0,
            form: {},
            history: [],
            idx: -1,
            id: -1,
            listest:[],
            historytest:[]
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
                this.listest= res.history;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        handleAddBanner() {            
                fetchData2(this.query).then(res => {
                console.log(res);
                this.listest= res.list;
            });

        },
        //查看详情操作
        handleDetail(index,row){
            this.$router.push('/banner_detail')
        },
        // 编辑操作
        handleEdit(index, row) {
            this.$router.push('/banner_edit');
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

        handleRelease(index, row) {
            this.idx = index;
            this.form = row;
            this.releaseVisible = true;
        },
        handleUnRelease(index, row) {
            this.idx = index;
            this.form = row;
            this.unReleaseVisible = true;
        },
        saveRelease() {
            this.releaseVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
        },
        saveUnRelease() {
            this.unReleaseVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
        },
        handleHistory(index, row) {
            this.idx = index;
            this.form = row;
            this.historyVisible = true;
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
.pop_title {
    font-size: 30px;
    font-weight:bold;
}

</style>

