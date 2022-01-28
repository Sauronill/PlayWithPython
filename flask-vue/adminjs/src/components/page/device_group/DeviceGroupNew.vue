<template>
    <div>
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 设备组管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>添加设备组</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->

        <div class="container">
            <div class="form-box">
                <span class="page_title">基本信息</span>
                <hr class="info_page_hr">
                <el-form class="form" ref="form" :model="form" label-width="80px">
                    <el-form-item>
                         <span slot="label">
                            <span class="must">*</span>
                            <span>名称</span>
                        </span>
                        <el-input v-model="form.name" placeholder="请输入设备组名"></el-input>
                    </el-form-item>
                    <el-form-item label="说明">
                        <el-input type="textarea" rows="5" v-model="form.desc"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>

        <div class="container">
            <span class="page_title">配置条件</span>
            <hr class="info_page_hr">
            <div class="form-box" style="margin-top:15px">
                <el-button type="primary" icon="el-icon-search" @click="handleAddCondition">添加条件</el-button>
                <el-button type="primary" icon="el-icon-delete" @click="handleSearch">删除</el-button>     
            </div>

            <el-table
                :data="devicegs.list"
                border
                class="table table_margin"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="brand" label="品牌名"  align="center"></el-table-column>
                <el-table-column prop="vehicle_type" label="车种名" align="center"></el-table-column>
                <el-table-column prop="vehicle_model" label="车型名" align="center"></el-table-column>
               
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="devicegs.pageIndex"
                    :page-size="devicegs.pageSize"
                    :total="devicegs.pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
            
            <div style="text-align:right">
                <el-button type="primary" @click="onSubmit">确认添加</el-button>
                <el-button type="primary">取消添加</el-button>
                
            </div>
            
        </div>
    

         <!-- 添加条件弹出框 -->
        <el-dialog title="添加条件" :visible.sync="addConditionVisible" width="20%" >
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="品牌" style="font-weight:bold">
                    <el-select v-model="form.region" placeholder="请选择">
                        <el-option key="bbk" label="步步高" value="bbk"></el-option>
                        <el-option key="xtc" label="小天才" value="xtc"></el-option>
                        <el-option key="imoo" label="imoo" value="imoo"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="车种" style="font-weight:bold">
                    <el-select v-model="form.region" placeholder="请选择">
                        <el-option key="bbk" label="步步高" value="bbk"></el-option>
                        <el-option key="xtc" label="小天才" value="xtc"></el-option>
                        <el-option key="imoo" label="imoo" value="imoo"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="车型" style="font-weight:bold">
                    <el-select v-model="form.region" placeholder="请选择">
                        <el-option key="bbk" label="步步高" value="bbk"></el-option>
                        <el-option key="xtc" label="小天才" value="xtc"></el-option>
                        <el-option key="imoo" label="imoo" value="imoo"></el-option>
                    </el-select>
                </el-form-item>
                
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveEdit">确 定</el-button>
                <el-button @click="addConditionVisible = false">取 消</el-button>
            </span>
        </el-dialog>
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
                pageIndex: 1,
                pageSize: 20,
                pageTotal: 1,
                list: []
            },
            apps: {
                pageIndex: 1,
                pageSize: 20,
                pageTotal: 1,
                list: []
            },
            addConditionVisible : false

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
                //this.devicegs.pageTotal = res.devicegs.size() || 20;
                this.apps.list = res.apps;
                //this.apps.pageTotal = res.apps.size() || 20;
            });
        },
        onSubmit() {
            this.$message.success('提交成功！');
        },
        handleAddCondition() {
            this.addConditionVisible = true;
        }
    }
};
</script>

<style scoped>
.table_margin {
    margin-top: 15px;
}

.form {
    margin-top:15px
}
</style>