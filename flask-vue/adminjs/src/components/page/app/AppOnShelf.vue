<template>
    <div>
        <!--
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 表单
                </el-breadcrumb-item>
                <el-breadcrumb-item>基本表单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        !-->
        <div class="container">
            <div class="form-box">
                <span class="page_title">基本信息</span>
                <hr class="info_page_hr">
                <el-form class = "form" ref="form" :model="form" label-width="80px">
                    <el-form-item label="应用名">
                        <el-input v-model="form.name" placeholder="显示应用名"></el-input>
                    </el-form-item>
                    <el-form-item label="简要描述">
                        <el-input v-model="form.summary" placeholder="显示简要描述"></el-input>
                    </el-form-item>
                    <el-form-item label="详细描述">
                        <el-input type="textarea" rows="5" v-model="form.description" placeholder="显示详细描述"></el-input>
                    </el-form-item>
                    <el-form-item label="供应商">
                        <el-input v-model="form.suplier" placeholder="显示供应商"></el-input>
                    </el-form-item>
                    <el-form-item label="应用类别">
                        <el-select v-model="form.region" placeholder="显示已选择类别">
                            <el-option key="bbk" label="步步高" value="bbk"></el-option>
                            <el-option key="xtc" label="小天才" value="xtc"></el-option>
                            <el-option key="imoo" label="imoo" value="imoo"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="推荐车型">
                        <el-select v-model="form.region" placeholder="显示车型">
                            <el-option key="bbk" label="步步高" value="bbk"></el-option>
                            <el-option key="xtc" label="小天才" value="xtc"></el-option>
                            <el-option key="imoo" label="imoo" value="imoo"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="版本号">
                        <el-input v-model="form.version" placeholder="显示版本号"></el-input>
                    </el-form-item>
                    
                </el-form>
            </div>
        </div>
        
          <div class="container">
            <div class="form-box">
                <span class="page_title">资源信息</span>
               <hr class="info_page_hr">
                <el-form class = "form" ref="form" :model="form" label-width="80px">
                    <el-form-item>
                        <span slot="label">
                            <span>icon图标</span>
                        </span>
                        <img :src="form.imageUrl" class="icon_avatar">
                    </el-form-item>
                    <el-form-item>
                        <span slot="label">
                            <span>Card图标</span>
                        </span>
                        <img :src="form.imageUrl" class="card_avatar">
                    </el-form-item>

                    <el-form-item>
                        <span slot="label">
                            <span>Banner图</span>
                        </span>
                        <img :src="form.imageUrl" class="card_avatar">
                    </el-form-item>
                    <el-form-item>
                        <span slot="label">
                            <span>安装包</span>
                        </span>
                        <el-label>xxxx.apk</el-label>
                        <el-button type="primary" style="margin-left:5px">下载</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

        <div class="container">
           <div class="form-box">
                <span class="page_title">功能介绍</span>
                <hr class="info_page_hr">
                <el-upload
                    action="#"
                    list-type="picture-card"
                    multiple="true"
                    :auto-upload="false">
                        <i slot="default" class="el-icon-plus"></i>
                        <div slot="file" slot-scope="{file}">
                        <img
                            class="el-upload-list__item-thumbnail"
                            :src="file.url" alt=""
                        >
                        <span class="el-upload-list__item-actions">
                            <span
                            class="el-upload-list__item-preview"
                            @click="handlePictureCardPreview(file)"
                            >
                            <i class="el-icon-zoom-in"></i>
                            </span>
                            <span
                            v-if="!disabled"
                            class="el-upload-list__item-delete"
                            @click="handleDownload(file)"
                            >
                            <i class="el-icon-download"></i>
                            </span>
                            <span
                            v-if="!disabled"
                            class="el-upload-list__item-delete"
                            @click="handleRemove(file)"
                            >
                            <i class="el-icon-delete"></i>
                            </span>
                        </span>
                        </div>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
           </div>
            
        </div>

        <div class="container">
            <div class="form-box">
                <span class="page_title">更新内容</span>
                <hr class="info_page_hr">
                <el-form class = "form" ref="form" :model="form" label-width="80px">
                     <el-form-item label="详细描述">
                        <el-input type="textarea" rows="10" v-model="form.description" placeholder="显示更新内容"></el-input>
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
                            <el-input placeholder="请输入车型" class="handle-input mr10"></el-input>
                        </el-form-item>
                        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                        <!-- <el-button type="primary" style="width:80px;float:right">取消全选</el-button>  
                        <el-button type="primary" style="width:80px;float:right">全选</el-button> -->
                    </el-row>
                </el-form>   

                <el-table
                    :data="tableData"
                    border
                    class="table table_margin"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column type="selection" width="55" ></el-table-column>
                    <el-table-column prop="brand" label="品牌"  ></el-table-column>
                    <el-table-column prop="kind" label="车种" ></el-table-column>
                    <el-table-column prop="model" label="车型" ></el-table-column>
                
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
                <div class="page_right_button">
                    <el-button type="primary" @click="onSubmit">确认上架</el-button>
                    <el-button type="primary">取消上架</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {fetchData as vehicleFetchData} from "../../../api/banner"
import {fetchData as appPreviewFetchData} from "../../../api/app_preview"

export default {
    name: 'baseform',
    data() {
        return {
            options: [
                {
                    value: 'guangdong',
                    label: '广东省',
                    children: [
                        {
                            value: 'guangzhou',
                            label: '广州市',
                            children: [
                                {
                                    value: 'tianhe',
                                    label: '天河区'
                                },
                                {
                                    value: 'haizhu',
                                    label: '海珠区'
                                }
                            ]
                        },
                        {
                            value: 'dongguan',
                            label: '东莞市',
                            children: [
                                {
                                    value: 'changan',
                                    label: '长安镇'
                                },
                                {
                                    value: 'humen',
                                    label: '虎门镇'
                                }
                            ]
                        }
                    ]
                },
                {
                    value: 'hunan',
                    label: '湖南省',
                    children: [
                        {
                            value: 'changsha',
                            label: '长沙市',
                            children: [
                                {
                                    value: 'yuelu',
                                    label: '岳麓区'
                                }
                            ]
                        }
                    ]
                }
            ],
            form: {
                name: '',
                suplier: '',
                version:'',
                region: '',
                date1: '',
                date2: '',
                delivery: true,
                type: ['步步高'],
                resource: '小天才',
                summary: '',
                description:'',
                apk:'',
                options: [],
                imageUrl:'http://139.196.43.11:8000/CardImg/gaodeditu.png',
                tempUrl:'',
            },
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
            previewData:[],
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false
        };
    },
    created() {
        this.getData();
    },
    methods: {

        getData() {
            vehicleFetchData(this.query).then(res => {
                console.log(res);
                this.tableData = res.devicegs;
                this.pageTotal = res.pageTotal || 50;
            });

            appPreviewFetchData(this.query).then(res => {
                console.log(res);
                this.previewData = res.previews;
            });
        },
        onSubmit() {
            this.$message.success('提交成功！');
        },
        handleChange(file, fileList) {
            this.tempUrl = URL.createObjectURL(file.raw);
        },
        //实现图片上传功能
        httpRequest(item) {
            //验证图片格式大小信息
            const isJPG = item.file.type == 'image/jpeg' || item.file.type == 'image/png';
            const isLt2M = item.file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error('上传图片只能是 JPG 或 PNG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!');
            }
            //图片格式大小信息没问题 执行上传图片的方法
            if (isJPG && isLt2M == true) {
                // post上传图片
                let App = this;
                //定义FormData对象 存储文件
                let mf = new FormData();
                //将图片文件放入mf
                mf.append('file', item.file);
                App.$Api.fileUpload(mf, function (result) {
                    if (result.result == "true") {
                        App.$notify.success({
                            title: '温馨提示：',
                            message: result.message,
                        });
                        //将临时文件路径赋值给显示图片路径（前端显示的图片）
                        App.imageUrl = App.tempUrl;
                        //将后台传来的数据库图片路径赋值给car对象的图片路径
                        App.car.carImg = result.imgUrl;
                    } else {
                        App.$notify.error({
                            title: '温馨提示：',
                            message: result.message,
                        });
                    }
                })
            }
        },
        handleRemove(file) {
            console.log(file);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleDownload(file) {
            console.log(file);
        }
    }
};
</script>

<style scoped>


.form {
    margin-top:15px
}

.form-item-btn {
    position: relative;
    text-align: right;
    margin-top: 2px;
}


.avatar-uploader {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: 178px;
        height: 178px;
    }
.avatar {
        width: 178px;
        height: 178px;
        display: flex;
    }

.avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: left;
    }

.avatar-uploader:hover {
        border-color: #409EFF;
    }

.card_avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

.card_avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

.icon_avatar {
        width: 100px;
        height: 100px;
        display: block;
    }

.icon_avatar-uploader-icon {
        font-size: 22px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }
</style>

