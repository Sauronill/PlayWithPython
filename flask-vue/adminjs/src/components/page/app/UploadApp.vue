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
                <span class="page_title"> 基本信息</span>
                <hr class="info_page_hr">
                <el-form class = "form" ref="form" :model="form" label-width="100px">
                    <el-form-item>
                        <span slot="label">
                            <span class="must">*</span>
                            <span>应用名</span>
                        </span>
                        <el-input v-model="form.name" placeholder="请输入应用名"></el-input>
                        <div><small>1.应用名不超过5个汉字或10个字符</small></div>
                        <div><small>2.请勿使用"&!#"等特殊字符</small></div>
                    </el-form-item>
                    <el-form-item>
                        <span slot="label">
                            <span class="must">*</span>
                            <span>简要描述</span>
                        </span>
                        <el-input v-model="form.summary" placeholder="请输入简要描述"></el-input>
                        <div><small>1.应用名不超过6个汉字或12个字符</small></div>
                        <div><small>2.请勿使用"&!#"等特殊字符</small></div>
                    </el-form-item>
                    <el-form-item label="详细描述">
                        <el-input type="textarea" rows="5" v-model="form.description" placeholder="请输入详细描述"></el-input>
                        <small>详细描述不超过200个汉字或400个字符</small>
                    </el-form-item>
                    <el-form-item label="供应商">
                        <el-input v-model="form.suplier" placeholder="请输入供应商"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <span slot="label">
                            <span class="must">*</span>
                            <span>应用类别</span>
                        </span>
                        <el-select v-model="form.region" placeholder="请选择">
                            <el-option key="bbk" label="步步高" value="bbk"></el-option>
                            <el-option key="xtc" label="小天才" value="xtc"></el-option>
                            <el-option key="imoo" label="imoo" value="imoo"></el-option>
                        </el-select>
                    </el-form-item>
                     <el-form-item>
                        <span slot="label">
                            <span>推荐车型</span>
                        </span>
                        <el-select v-model="form.region" placeholder="请选择">
                            <el-option key="bbk" label="步步高" value="bbk"></el-option>
                            <el-option key="xtc" label="小天才" value="xtc"></el-option>
                            <el-option key="imoo" label="imoo" value="imoo"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <span slot="label">
                            <span class="must">*</span>
                            <span>版本号</span>
                        </span>
                        <el-input v-model="form.version" placeholder="请输入版本号"></el-input>
                        <div><small>格式为"V 版本号"，比如"V 0.3"</small></div>
                    </el-form-item>
                    
                </el-form>
            </div>
        </div>
        
          <div class="container">
            <div class="form-box">
               <span class="page_title"> 资源信息</span>
               <hr class="info_page_hr">
                <el-form class = "form" ref="form" :model="form" label-width="80px">
                    <el-form-item>
                        <span slot="label">
                            <span class="must">*</span>
                            <span>icon图标</span>
                        </span>
                        <el-upload
                                class="avatar-uploader"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess">
                            <img v-if="form.imageUrl" :src="form.imageUrl" class="icon_avatar">
                            <i v-else class="el-icon-plus icon_avatar-uploader-icon"></i>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过xxxxkb</div>
                        </el-upload>
                        
                    </el-form-item>

                    <el-form-item>
                        <span slot="label">
                            <span class="must">*</span>
                            <span>Card图标</span>
                        </span>
                        <el-upload
                                class="avatar-uploader"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess">
                            <img v-if="form.imageUrl" :src="form.imageUrl" class="card_avatar">
                            <i v-else class="el-icon-plus card_avatar-uploader-icon"></i>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过xxxxkb</div>
                        </el-upload>
                    </el-form-item>

                     <el-form-item>
                        <span slot="label">
                            <span class="must">*</span>
                            <span>Banner图</span>
                        </span>
                        <el-upload
                                class="avatar-uploader"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess">
                            <img v-if="form.imageUrl" :src="form.imageUrl" class="card_avatar">
                            <i v-else class="el-icon-plus card_avatar-uploader-icon"></i>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过xxxxkb</div>
                            <div slot="tip" class="el-upload__tip" style="color:red">若不上传Banner图，此应用不会出现在Banner推送的可配置应用列表中！</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <span slot="label">
                            <span class="must">*</span>
                            <span>安装包</span>
                        </span>
                        <el-button type="primary">上传</el-button>
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
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png图片，且不超过xxxkb；视频大小不超过xxxxm</div>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
           </div>
        </div>

        <div class="container">
            <div class="form-box">
                <span class="page_title"> 更新内容</span>
                <hr class="info_page_hr">
                <el-form class = "form" ref="form" :model="form" label-width="80px">
                     <el-form-item label="详细描述">
                        <el-input type="textarea" rows="10" v-model="form.description" placeholder="请输入更新内容"></el-input>
                    </el-form-item>
                   
                </el-form>
                <div class="page_right_button">
                    <el-button type="primary" @click="onSubmit">确认保存</el-button>
                    <el-button >取消保存</el-button>
                    <el-button type="primary">确认提交</el-button>
                </div>
            </div>
           
        </div>
    </div>
</template>

<script>
import { fetchData } from "../../../api/app_preview";

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
                imageUrl:'',
                tempUrl:'',
            },
            previewData:[]
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            fetchData(this.query).then(res => {
                console.log(res);
                this.previewData = res.previews;
            });
        },
        handleAvatarSuccess(res, file) {
            this.form.imageUrl = URL.createObjectURL(file.raw);
        },
        onSubmit() {
            this.$message.success('提交成功！');
        },
        notFirst(index) {
            if (index != 0) {
                return true;
            }
        },
        notLast(index) {
            if (index != (this.previewData.length -1)) {
                return true;
            }
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

