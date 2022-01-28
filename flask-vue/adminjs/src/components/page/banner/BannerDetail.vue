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
                        未发布
                    </el-form-item>
                </el-form>
            </div>
        </div>

        <div class="container">
            <div class="form-box">
                <span class="page_title">已配置车型</span>
                <hr class="info_page_hr">
                <el-table
                    :data="list"
                    border
                    class="as_table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                >

                    <el-table-column prop="brand" label="品牌" align="center"></el-table-column>
                    <el-table-column prop="kind" label="车种" align="center"></el-table-column>
                    <el-table-column prop="model" label="车型" align="center"></el-table-column>

                </el-table>
            </div>
        </div>

        <div class="container">
            <div class="form-box">
                <span class="page_title">已配置应用</span>
                <hr class="info_page_hr">
                <el-form :inline="true" class = "form">
                </el-form>
                <el-table
                    :data="apps.list"
                    border
                    class="as_table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                >
                    <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                    <el-table-column prop="name" label="名称" width="200" align="center"></el-table-column>
                    <el-table-column prop="description" label="描述" align="center"></el-table-column>
                    <el-table-column label="图片" >
                        <template slot-scope="scope">
                            <el-image
                                class="as_table-td-thumb"
                                :src="scope.row.res"
                                :preview-src-list="[scope.row.res]"
                            ></el-image>
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
                pageTotal: 3,
                list: []
            },
            apps: {
                pageIndex: 1,
                pageSize: 20,
                pageTotal: 1,
                list: []
            },
            isBackgound:true,
            list:[{"brand":"林肯", "kind":"林肯", "model":"林肯"}]
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
.close-button{

    background: #409EFF;
    color: #FFF;
    float: right;
}
</style>
<style>
.pagination-style.is-background .el-pager li:not(.disabled).active {
    background-color: #1CBE8D;
    color: #FFF;
}

</style>