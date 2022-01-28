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
                    <span style="margin-left: 20px;">设备组名:</span>
                    <el-input v-model="query.name" placeholder="请输入设备组名" class="mr10"></el-input>
                    <el-button type="primary" icon="el-icon-search" @click="handleSearch" style="margin-right:40px; float:right">搜索</el-button>
                    <el-button type="primary" icon="el-icon-refresh" @click="handleReset" style="margin-right:10px; float:right">重置</el-button>
                </div>
            </div>
            <div class=container-action>
                <div class="handle-active-box">
                    <router-link to="/device_group_new">
                    <el-button type="primary" icon="el-icon-plus" @click="handleSearch" style="margin-left:20px">添加设备组</el-button>
                    </router-link>
                </div>
            </div>
            
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
            <div class=container-table>
                <div class="handle-box">
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
                        <el-table-column prop="id" label="ID" width="55" ></el-table-column>
                        <el-table-column prop="name" label="设备组名" width="150" ></el-table-column>
                        <el-table-column prop="description" label="说明" ></el-table-column>
                        <!--
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
                        

                        <el-table-column prop="date" label="注册时间"></el-table-column>!-->
                        
                        <!--<el-table-column label="操作" width="180" align="center">
                            <template slot-scope="scope">
                                <el-button
                                    type="text"
                                    icon="el-icon-edit"
                                    @click="handleEdit(scope.$index, scope.row)"
                                >编辑</el-button>
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
                        </el-table-column>!-->
                        <el-table-column label="操作" width="200px" >
                            <template slot-scope="scope">
                                <router-link to="/device_group_detail">
                                    <el-button
                                        style="margin-left:3px"
                                        type="text"
                                        icon="el-icon-info"
                                    >查看详情</el-button>
                                </router-link>
                                <el-button
                                    style="margin-left:3px"
                                    type="text"
                                    icon="el-icon-edit"
                                    @click="handleEdit(scope.$index, scope.row)"
                                >编辑</el-button>
                                <el-button
                                    style="margin-left:3px"
                                    type="text"
                                    icon="el-icon-close"
                                    class="red"
                                    @click="handleDelete(scope.$index, scope.row)"
                                >删除</el-button>
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
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
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
import { fetchData } from '../../../api/devicegroup';

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
                this.pageTotal = res.pageTotal || 50;
            });
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
.mr10 {
    margin-right: 10px;
    margin-left: 10px;
}


.search_title {
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    margin-left: 20px;
}
</style>
