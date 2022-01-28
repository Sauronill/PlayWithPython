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
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="简要描述">
                        <el-input v-model="form.summary"></el-input>
                    </el-form-item>
                    <el-form-item label="详细描述">
                        <el-input type="textarea" rows="5" v-model="form.description"></el-input>
                    </el-form-item>
                    <el-form-item label="供应商">
                        <el-input v-model="form.suplier"></el-input>
                    </el-form-item>
                    <el-form-item label="应用类别">
                        <el-select v-model="form.region">
                            <el-option key="bbk" label="步步高" value="bbk"></el-option>
                            <el-option key="xtc" label="小天才" value="xtc"></el-option>
                            <el-option key="imoo" label="imoo" value="imoo"></el-option>
                        </el-select>
                    </el-form-item>
                     <el-form-item label="推荐车型">
                        <el-select v-model="form.vehicle">
                            <el-option key="bbk" label="步步高" value="bbk"></el-option>
                            <el-option key="xtc" label="小天才" value="xtc"></el-option>
                            <el-option key="imoo" label="imoo" value="imoo"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="版本号">
                        <el-input v-model="form.version"></el-input>
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
                        <el-label style = "color:blue">xxxx.apk</el-label>
                    </el-form-item>

                     <el-form-item>
                        <span slot="label">
                            <span>决策文件</span>
                        </span>
                       <el-label style = "color:blue">xxxxx.xlsx</el-label>
                    </el-form-item>
                </el-form>
            </div>
        </div>

        <div class="container">
            <span class="page_title"> 功能介绍</span>
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
        </div>

        <div class="container">
            <div class="form-box">
                <span class="page_title"> 更新内容</span>
                <hr class="info_page_hr">
                <el-form class = "form" ref="form" :model="form" label-width="80px">
                     <el-form-item label="详细描述">
                        <el-input type="textarea" rows="10" v-model="form.description" placeholder="显示更新内容"></el-input>
                    </el-form-item>
                   
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import {fetchData} from "../../../api/app_preview"
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
                name: '显示应用名',
                suplier: '显示供应商信息',
                version:'显示版本号',
                region: '显示应用类别',
                vehicle: '显示车型',
                date1: '',
                date2: '',
                delivery: true,
                type: ['步步高'],
                resource: '小天才',
                summary: '显示简要描述',
                description:'显示详细描述',
                apk:'请上传安装包',
                options: [],
                imageUrl:'http://139.196.43.11:8000/CardImg/gaodeditu.png',
                previewData:[]
            },
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            fetchData(this.query).then(res => {
                console.log(res);
                this.form.previewData = res.previews;
            });
        },
        onSubmit() {
            this.$message.success('提交成功！');
        }
    }
};
</script>

<style scoped>


.form {
    margin-top:15px
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }


.avatar-uploader .el-upload:hover {
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

.preview_avatar {
        width: 226px;
        height: 198px;
        display: block;
    }

.preview_avatar-uploader-icon {
        font-size: 30px;
        color: #8c939d;
        width: 226px;
        height: 198px;
        line-height: 200px;
        text-align: center;
    }
</style>