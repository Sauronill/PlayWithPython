<template>
    <div>
        <!--
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> Banner Management
                </el-breadcrumb-item>
                <el-breadcrumb-item>添加Banner</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        -->

        <div class="container">
            <span class="page_title">基本信息</span>
            <hr class="info_page_hr">
            <div class="form-box">
                <el-form class = "form" ref="form" :model="form" label-width="80px">
                    <el-form-item label="状态" class="page_title">
                        <el-select v-model="form.region" placeholder="请选择">
                            <el-option key="release" label="已发布" value="已发布"></el-option>
                            <el-option key="not_release" label="未发布" value="未发布"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
        </div>

        <div class="container">
            <div class="form-box">
                <span class="page_title">配置车型</span>
                <hr class="info_page_hr">
                <el-form :inline="true" class = "form">
                    <el-row>
                        <el-form-item>
                            <el-input placeholder="请输入车型名" class="handle-input mr10"></el-input>
                        </el-form-item>
                        <el-button type="primary" @click="handleSearch"><b>搜 索</b></el-button>
                    </el-row>
                </el-form>
                <el-table
                    :data="devicegs.list"
                    border
                    class="as_table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                >
                    <el-table-column type="selection" width="55" ></el-table-column>
                    <el-table-column prop="brand" label="品牌" ></el-table-column>
                    <el-table-column prop="kind" label="车种" ></el-table-column>
                    <el-table-column prop="model" label="车型" ></el-table-column>

                </el-table>
                <div class="pagination">
                    <el-pagination                        
                        background                    
                        :page-size="devicegs.pageSize"
                        :page-sizes="devicegs.pageSizes"
                        layout=" total, prev, pager, next"
                        :total="devicegs.pageTotal"
                        @current-change="handleCurrentChange"
                    ></el-pagination>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="form-box">
                <span class="page_title">配置应用</span>
                <hr class="info_page_hr">
                <el-form :inline="true" class = "form">
                    <el-row>
                        <el-form-item>
                            <el-input placeholder="请输入应用名称" class="handle-input mr10"></el-input>
                        </el-form-item>
                        <el-button type="primary" @click="handleSearch"><b>搜 索</b></el-button>
                    </el-row>
                </el-form>
                <el-table
                    :data="apps.list"
                    border
                    class="as_table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                >
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="name" label="名称" width="200" ></el-table-column>
                    <el-table-column prop="description" label="描述"></el-table-column>
                    <el-table-column label="图片" >
                        <template slot-scope="scope">
                            <el-image
                                class="as_table-td-thumb"
                                :src="scope.row.res"
                                :preview-src-list="[scope.row.res]"
                            ></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="200" >
                        <template slot-scope="scope">
                            <el-button
                                type="text"
                                icon="el-icon-sort-up"
                                v-if="notFirst(scope.$index)"
                            >上移</el-button>
                            <el-button
                                type="text"
                                icon="el-icon-sort-down"
                                v-if="notLast(scope.$index, apps.list)"
                                @click="handleEdit(scope.$index, scope.row)"
                            >下移</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagination">
                    <el-pagination                        
                        background          
                        :page-size="devicegs.pageSize"
                        :page-sizes="devicegs.pageSizes"
                        layout=" total, prev, pager, next"
                        :total="devicegs.pageTotal"
                        @current-change="handleCurrentChange"
                    ></el-pagination>
                </div>

               <div class="page_right_button">
                   <el-button type="primary" @click="onSubmit" >确认添加</el-button>
                    <el-button type="primary" @click="back" >取消添加</el-button>
               </div>
            </div>
        </div> 
    </div>
</template>

<script>
import { fetchData } from '../../../api/banner';
export default {
    name: 'baseform',
    data() {
        return {
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10,
                pageTotal: 1
            },
            form: {
                name: '',
                region: '',
                desc: '',
                options: []
            },
            devicegs: {
                pageIndex: 10,
                pageSize: 5,
                pageSizes:[5,10,20,30,40],
                pageTotal: 100,
                list: []
            },
            apps: {
                pageIndex: 1,
                pageSize: 20,
                pageTotal: 1,
                list: []
            },
            isBackgound:true,
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            fetchData(this.query).then(res => {
                console.log(res);
                this.devicegs.list = res.devicegs;
                this.apps.list = res.apps;
                this.apps.pageTotal = res.apps.length || 20;
            });
        },
        onSubmit() {
            this.$message.success('提交成功！');
        },
        notFirst(index) {
            if (index != 0) {
                return true;
            }
        },
        notLast(index, tableData) {
            if (index != (tableData.length -1)) {
                return true;
            }
        },
        handleSearch(){

        },
        handlePageChange() {
        },
        back() {
            this.$router.push('/banner_management');
        },
    }
};
</script>

<style scoped>
.form {
    margin-top:15px
}
</style>
<style>
.pagination-style.is-background .el-pager li:not(.disabled).active {
    background-color: #1CBE8D;
    color: #FFF;

}
</style>
