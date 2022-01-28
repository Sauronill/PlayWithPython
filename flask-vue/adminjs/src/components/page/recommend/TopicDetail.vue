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
        <!-- <button type="button" aria-label="Close" class="el-dialog__headerbtn" style="top:15px">
            <i class="el-dialog__close el-icon el-icon-close" style="color:black"></i>
        </button> -->
        <div class="container">
            <div class="form-box">
                <span class="page_title"> 基本信息</span>
                <hr class="info_page_hr">
                <el-form class = "form" ref="form" :model="form" label-width="80px">
                    <el-form-item>
                        <span slot="label">
                            <span><font >名称</font></span>
                        </span>
                        <el-text>专题名</el-text>
                        <!-- <el-input v-model="form.name" placeholder="请输入专题名"></el-input> -->
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-text type="textarea" rows="5" v-model="form.summary">xxxx</el-text>
                    </el-form-item>
                    <el-form-item label="专题图片">
                        <template >
                            <el-image
                                class="as_table-td-thumb"
                                :src="'https://lin-xin.gitee.io/images/post/wms.png'"
                                :preview-src-list="'https://lin-xin.gitee.io/images/post/wms.png'"
                            ></el-image>
                        </template>
                        <!-- <el-button type="primary" style="width:120px;margin-left:10px">上传</el-button> -->
                    </el-form-item>
                    <el-form-item>
                        <span slot="label">
                            <span>状态</span>
                        </span>
                        <el-text>未发布</el-text>
                        <!-- <el-input v-model="form.name" placeholder="请输入专题名"></el-input> -->
                    </el-form-item>
                </el-form>
            </div>
        </div>
        
        <div class="container">
            <div class="form-box">
                <span class="page_title"> 已配置车型</span>
                <hr class="info_page_hr">
                <el-table
                    :data="list"
                    border
                    class="as_table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    @selection-change="handleSelectionChange"
                    style="margin-top:15px"
                >
                    <el-table-column prop="id" label="ID" width="55" ></el-table-column>
                    <el-table-column prop="brand" label="品牌" ></el-table-column>
                    <el-table-column prop="kind" label="车种" ></el-table-column>
                    <el-table-column prop="model" label="车型" ></el-table-column>
                </el-table>
            </div>
        </div>

        <div class="container">
            <div class="form-box">
                <span class="page_title"> 已配置应用</span>
                <hr class="info_page_hr">
                <el-table
                    :data="appTableData"
                    border
                    class="as_table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    @selection-change="handleSelectionChange"
                    style="margin-top:15px"
                >
                    <el-table-column prop="id" label="ID" width="55" ></el-table-column>
                    <el-table-column prop="name" label="名称" ></el-table-column>
                    <el-table-column prop="discription" label="描述" ></el-table-column>

                </el-table>
                <div class="pagination">
                    <el-pagination
                        background
                        layout="total, prev, pager, next"
                        :current-page="query.pageIndex"
                        :page-size="query.pageSize"
                        :total="appTotal"
                        @current-change="handlePageChange"
                    ></el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
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
            deviceTableData: [{
                "id": 1,
                "name": "设备组1",
                "discription": "设备组1",
                "state": "成功",
                },
                {
                "id": 2,
                "name": "设备组2",
                "discription": "设备组2",
                "state": "成功",
                }
            ],
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            deviceTotal:20,
            appTableData: [{
                "id": 1,
                "name": "高德地图",
                "discription": "高德地图",
                "state": "成功",
                "index":0
                },
                {
                "id": 2,
                "name": "QQ音乐",
                "discription": "QQ音乐",
                "state": "成功",
                "index":1
                },
                                {
                "id": 3,
                "name": "香氛",
                "discription": "香氛",
                "state": "成功",
                "index":2
                }
            ],
            appTotal:20,
            list:[{"brand":"林肯", "kind":"林肯", "model":"林肯"}]
        };
    },
    devicePageTotal: 100,
    methods: {
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
        getData() {
            this.devicedeviceTableData = res.list;
            this.devicePageTotal = 10;

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
        height: 178px;
        width: auto;
    }
.avatar {
        height: 178px;
        display: flex;
    }

.avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        float: center;
        /* width: 200px; */
        /* height: 178px; */
        line-height: 178px;
        /* text-align: left; */
    }

.avatar-uploader:hover {
        border-color: #409EFF;
    }

.el-upload
{
    width: 200px;
}

.handle-input {
    width: 300px;
    display: inline-block;
    width: 15%;
    margin-left: 20px;
    font-size: 14px;
}
.mr10 {
    margin-right: 10px;
}
.el-pagination
{
    text-align: center;
}
.blue {
    color: #409EFF;
}
.gray {
    color: #aaaaaa;
}
.el-form-item__label{
    color: #000;
}
</style>

