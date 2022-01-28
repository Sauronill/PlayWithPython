<template>
    <div>
        <!--
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 基础表格
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        !-->
        <div class="container-search">
            <div class="handle-box">
                <!--
                <el-button
                    type="primary"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="delAllSelection"
                >批量删除</el-button>
                !-->
                <span style="margin-left:20px">应用名:</span>
                <el-input v-model="query.name" placeholder="请输入应用名" class="mr10" style="margin-left:20px"></el-input>
                <span  style="margin-left:20px">状态:</span>
                <el-select v-model="query.status" placeholder="请选择" class="mr10" style="margin-left:20px">
                    <el-option key="1" label="上架" value="上架"></el-option>
                    <el-option key="2" label="下架" value="下架"></el-option>
                </el-select>
                <span  style="margin-left:20px">供应商:</span>
                <el-input v-model="query.supplier" placeholder="请输入供应商" class="mr10" style="margin-left:20px"></el-input>
                <span  style="margin-left:20px">应用类别:</span>
                <el-select v-model="query.type" placeholder="请选择" class="mr10" style="margin-left:20px">
                    <el-option key="1" label="导航" value="导航"></el-option>
                    <el-option key="2" label="导航" value="导航"></el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-lx-upload"  style = "margin-right:10px;float:right"  >导出数据</el-button>
                <router-link to="/upload_application">
                <el-button type="primary"  @click="handleAdd" icon="el-icon-plus" style = "margin-right:10px; float:right">上传应用</el-button>
                </router-link>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch" style ="margin-left:20px">搜索</el-button>
                <el-button type="primary" icon="el-icon-refresh" @click="handleReset" style ="margin-left:20px" >重置</el-button> 
            </div>
        </div>

        <div class="container-table">
            <!--<el-table
                :data="tableData"
                border
                class="as_table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="用户名"></el-table-column>
                <el-table-column label="账户余额">
                    <template slot-scope="scope">￥{{scope.row.money}}</template>
                </el-table-column>
                <el-table-column label="头像(查看大图)" align="center">
                    <template slot-scope="scope">
                        <el-image
                            class="as_table-td-thumb"
                            :src="scope.row.thumb"
                            :preview-src-list="[scope.row.thumb]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <el-tag
                            :type="scope.row.state==='成功'?'success':(scope.row.state==='失败'?'danger':'')"
                        >{{scope.row.state}}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column prop="date" label="注册时间"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            !-->
            <el-table
                :data="tableData"
                border
                class="as_table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                
                <!--<el-table-column prop="name" label="应用名"></el-table-column>
                <el-table-column prop="name" label="摘要信息"></el-table-column>!-->
                <el-table-column prop="name" label="应用名" ></el-table-column>
                <el-table-column prop="summary" label="摘要信息" ></el-table-column>
                <el-table-column prop="latest_version" label="最新版本号" ></el-table-column>
                <el-table-column prop="date" label="上传日期" ></el-table-column>
                <el-table-column prop="state" label="状态" ></el-table-column>
                <el-table-column prop="supplier" label="供应商" ></el-table-column>
                <el-table-column prop="type" label="类型" ></el-table-column>
                <el-table-column label="操作" width="750px" >
                    <template slot-scope="scope">
                        <router-link to="/app_version_list">
                            <el-button
                                type="text"
                                icon="el-icon-s-data"
                            >查看版本列表</el-button>
                        </router-link>
                        <router-link to="/app_detail">
                            <el-button
                                class="action_btn"
                                type="text"
                                icon="el-icon-info"
                            >查看详情</el-button>
                        </router-link>
                         <el-button
                            class="action_btn"
                            type="text"
                            icon="el-icon-arrow-up"
                            v-if="isUpgradeBtnVisible(scope.row)"
                            @click="handleEdit(scope.$index, scope.row)"
                        >升级</el-button>
                        <el-button
                            class="action_btn"
                            type="text"
                            icon="el-icon-edit"
                            v-if="isEditBtnVisible(scope.row)"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-close"
                            class="red action_btn"
                            v-if="isDeleteBtnVisible(scope.row)"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                         <el-button
                            class="action_btn"
                            type="text"
                            icon="el-icon-s-check"
                            v-if="isExamineBtnVisible(scope.row)"
                            @click="handleEdit(scope.$index, scope.row)"
                        >审核</el-button>
                        <router-link to="/app_on_shelf">
                            <el-button
                                class="action_btn"
                                type="text"
                                icon="el-icon-circle-check"
                                v-if="isOnShelfBtnVisible(scope.row)"
                            >上架</el-button>
                        </router-link>
                         <el-button
                            class="action_btn"
                            type="text"
                            icon="el-icon-circle-close"
                            v-if="isOffShelfBtnVisible(scope.row)"
                            @click="handleEdit(scope.$index, scope.row)"
                        >下架</el-button>
                         <el-button
                            class="action_btn"
                            type="text"
                            icon="el-icon-info"
                            @click="handleHistory(scope.$index, scope.row)"
                        >查看变更履历</el-button>
                         <el-button
                            class="action_btn"
                            type="text"
                            icon="el-icon-info"
                            v-if="isReturnReasonBtnVisible(scope.row)"
                            @click="handleReturn(scope.$index, scope.row)"
                        >查看退回理由</el-button>        
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
        <!--退回弹出框-->
        <el-dialog title="退回履历" :visible.sync="returnVisible" width="30%">
            
            <el-table  class="as_table" border >
                <el-table-column label="审核者" width="150"></el-table-column>
                <el-table-column label="时间" width="150"></el-table-column>
                <el-table-column label="理由"></el-table-column>
            </el-table>
            <div class="pagination">
            <el-pagination 
                background="isBackground"
                :pager-count="devicegs.count"
                :total="devicegs.pageTotal"
                layout="prev, pager, next"
                align="center"
            ></el-pagination>
            </div>
            
        </el-dialog>
    </div>
</template>

<script>
import { fetchData } from '../../../api/app';

export default {
    name: 'basetable',

    data() {
        return {
            query: {
                address: '',
                name: '',
                status:'',
                supplier:'',
                type:'',
                pageIndex: 1,
                pageSize: 10
            },
            devicegs: {
                count:5,
                pageTotal: 500,
                list: []
            },            
            
            visable:false,
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            returnVisible:false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
            role :'操作员',
            isBackground:true
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
        isUpgradeBtnVisible(row) {
            if (this.role =="开发者") {
                if (row.state != "已下架" && row.state != "待审核") {
                    return true;
                }
            } 
        },
        isEditBtnVisible(row) {
            if (this.role =="开发者") {
                if (row.state == "待审核") {
                    return true;
                }
            }
            
        },
        isDeleteBtnVisible(row) {
            if (this.role =="开发者") {
                if (row.state == "待审核") {
                    return true;
                }
            }
            
        },
        isExamineBtnVisible(row) {
            if (this.role =="操作员") {
                if (row.state != "已下架") {
                    return true;
                }
            }
        },
        isOnShelfBtnVisible(row) {
            if (this.role =="操作员") {
                if (row.state != "已下架") {
                    return true;
                }
            }
        },
        isOffShelfBtnVisible(row) {
            if (this.role =="操作员") {
                if (row.state != "已上架") {
                    return true;
                }
            }
        },
        isReturnReasonBtnVisible(row) {
            if (row.state != "审核不通过") {
                return true;
            }
        },
        
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        handleReset() {
            this.query.name = '';
            this.query.status = '';
            this.query.supplier = '';
            this.query.type = '';
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
        handleReturn(index, row) {
            this.idx = index;
            this.form = row;
            this.returnVisible = true;
        },
        handleHistory() {
            this.$router.push('/app_version_history');
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
    margin-top: 20px;
    vertical-align: middle;
}
.handle-active-box {
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
    margin-top: 20px;
}
.red {
    color: #ff0000;
}
.blue {
    color: blue;
}
.mr10 {
    margin-left: 10px;
    margin-right: 10px;

}

.action_btn {
    margin-left: 5px;
}

</style>

<style >
.title-dialog .el-dialog__header {
    
    background: #F2F6FC;
    font-size: 30px;
    margin-top: 20px;
    font-weight:bold;

}
</style>
