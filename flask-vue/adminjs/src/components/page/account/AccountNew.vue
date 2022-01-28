<template>
    <div>
<!--         
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 用户管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>新增用户</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div class="container">
            <span class="page_title"> 新增用户</span>
            <hr class="info_page_hr">
            <div class="form-box">
                <el-form class = "form" ref="form" :model="form" label-width="80px">
                     <el-form-item>
                        <span slot="label">
                            <span class="must">*</span>
                            <span>用户名</span>
                        </span>
                        <el-input v-model="form.description" placeholder="请输入用户名"></el-input>
                        <div><small>1.用户名由英文字母与数字组成</small></div>
                        <div><small>2.长度不超过16位</small></div>
                    </el-form-item>
                    <el-form-item >
                        <span slot="label">
                            <span class="must">*</span>
                            <span>密码</span>
                        </span>
                        <el-input rows="1" v-model="form.description" placeholder="请输入密码"></el-input>
                        <div><small>长度不小于8位</small></div>
                    </el-form-item>
                    <el-form-item >
                        <span slot="label">
                            <span class="must">*</span>
                            <span>邮箱地址</span>
                        </span>
                        <el-input rows="1" v-model="form.description" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                    <el-form-item >
                        <span slot="label">
                            <span class="must">*</span>
                            <span>用户角色</span>
                        </span>
                        <el-select  placeholder="请选择" class="handle-select mr10">
                            <el-option key="1" label="管理员" value="管理员"></el-option>
                            <el-option key="2" label="开发者" value="开发者"></el-option>
                            <el-option key="3" label="操作员" value="操作员"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="用户状态">
                        <el-radio-group v-model="form.resource">
                            <el-radio v-model="form.radio" label="0">启用</el-radio>
                            <el-radio label="1">禁用</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item >
                        <span slot="label">
                            <span class="must">*</span>
                            <span>单位</span>
                        </span>
                        <el-input rows="1" v-model="form.description" placeholder="请输入单位"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div style= "margin-top:40px">
                <el-button class="form-item-btn_ok" type="primary" @click="onSubmit">确认</el-button>
                <el-button class="form-item-btn_cancel" type="primary">取消</el-button>
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
                resource: '0',
                summary: '',
                description:'',
                apk:'',
                options: [],
                imageUrl:'',
                tempUrl:'',
                radio:'0',
            }
        };
    },
    methods: {
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

.form-item-btn_ok {
    position: relative;
    left: 200px;
}
.form-item-btn_cancel {
    position: relative;
    left: 260px;
}

</style>

