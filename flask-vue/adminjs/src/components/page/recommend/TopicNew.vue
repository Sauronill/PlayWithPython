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
        <!-- <div><h3>添加专题推荐</h3></div> -->
        <!-- <div style="border-top:2px solid #000"></div> -->
        <div class="container">
            <div class="form-box">
                <span class="page_title"> 基本信息</span>
                <hr class="info_page_hr">
                <el-form class = "form" ref="form" :model="form" label-width="80px">
                    <el-form-item>
                        <span slot="label">
                            <span style="color:red">*</span>
                            <span>名称</span>
                        </span>
                        <el-input v-model="form.name" placeholder="请输入专题名"></el-input>
                        <small>不超过20个汉字或40个字符</small>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input type="textarea" rows="5" v-model="form.summary"></el-input>
                        <small>不超过150个汉字或300个字符</small>
                    </el-form-item>
                    <el-form-item label="专题图片" >
                        <el-upload style="width:300px;"
                            action="111" 
                            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                            <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过xxxxkb</div>
                        </el-upload>

                        <!-- <el-button type="primary" style="width:120px;margin-left:10px">上传</el-button> -->
                    </el-form-item>

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
                <span class="page_title"> 配置车型</span>
                <hr class="info_page_hr">
                <el-form :inline="true" class = "form">
                    <el-row>
                        <el-form-item>
                            <el-input placeholder="请输入车型" class="handle-input mr10"></el-input>
                        </el-form-item>
                        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                    </el-row>
                </el-form>
                
                <el-table
                    :data="deviceTableData"
                    border
                    class="as_table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    @selection-change="handleSelectionChange"
                    style="margin-top:10px"
                >
                    <el-table-column type="selection" width="55" ></el-table-column>
                    <el-table-column prop="brand" label="品牌" ></el-table-column>
                    <el-table-column prop="kind" label="车种" ></el-table-column>
                     <el-table-column prop="model" label="车型" ></el-table-column>
                </el-table>
                <div class="pagination">
                    <el-pagination
                        background
                        layout="total, prev, pager, next"
                        :current-page="query.pageIndex"
                        :page-size="query.pageSize"
                        :total="deviceTotal"
                        @current-change="handlePageChange"
                    ></el-pagination>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="form-box">
                <span class="page_title"> 配置应用</span>
                <hr class="info_page_hr">

                <el-form :inline="true" class = "form">
                    <el-row>
                        <el-form-item>
                            <el-input placeholder="请输入应用名称" class="handle-input mr10"></el-input>
                        </el-form-item>
                        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                        <el-button id="normal_btn1" type="primary" style="width:120px;float:right" @click="handleSearch">取消全选</el-button>
                        <el-button id="normal_btn" type="primary" style="width:120px;float:right" @click="handleSearch">全选</el-button>
                    </el-row>
                </el-form>

                <el-table
                    :data="appTableData"
                    border
                    class="as_table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    @selection-change="handleSelectionChange"
                    style="margin-top:10px"
                >
                    <el-table-column type="selection" width="55" ></el-table-column>
                    <el-table-column prop="name" label="名称" width=200% ></el-table-column>
                    <el-table-column prop="discription" label="描述" ></el-table-column>
                    <el-table-column label="操作"   width=300%>
                        <template slot-scope="scope">
                            <el-button
                                type="text" 
                                icon="el-icon-sort-up"
                                v-if="notFirst(scope.$index)"
                            >上移</el-button>
                            <el-button
                                type="text" 
                                icon="el-icon-sort-down"
                                v-if="notLast(scope.$index, appTableData)"
                            >下移</el-button>
                        </template>
                    </el-table-column>
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
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item>
                        <el-button type="primary" style="margin-right:10px;float:right">取消</el-button>
                        <el-button type="primary" @click="onSubmit" style="margin-right:10px;float:right">确认</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { fetchData } from '../../../api/banner';
export default {
    name: 'secondaryClassification',
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
            deviceTableData: [],
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
                "id": 1,
                "name": "QQ音乐",
                "discription": "QQ音乐",
                "state": "成功",
                "index":1
                },
                                {
                "id": 1,
                "name": "香氛",
                "discription": "香氛",
                "state": "成功",
                "index":2
                }
            ],
            appTotal:20
        };
    },
    devicePageTotal: 100,
    created() {
        this.getData();
    },
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
        getData(){
            fetchData().then(res => {
                console.log(res);
                this.deviceTableData = res.devicegs;
                this.devicePageTotal = 10;
            });
        },
                // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
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
        handleSelectionChange(){}
    }
};
</script>

<style scoped>


.form {
    margin-top:15px
}


.el-upload
{
    width: 200px;
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
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.el-uploader .el-upload--text {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 178px;
    height: 178px;
}
/* .secondaryClassification>>>.avatar-uploader .el-upload:hover {
border-color: #409EFF;
} */
.avatar-uploader-icon {
font-size: 28px;
color: #8c939d;
width: 178px;
height: 178px;
line-height: 178px;
text-align: center;
}
.avatar {
width: 178px;
height: 178px;
display: block;
}

/deep/ .el-upload{
  width: 100%;
}
/deep/ .el-upload .el-upload-dragger{
  width: 100%;
}

</style>

