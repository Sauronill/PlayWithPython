<template>
    <div>
        <div class="container">
            <span class="page_title"> 修改密码</span>
            <hr class="info_page_hr">
            <div class="form-box">
                <el-form class = "form" ref="form" :model="form" label-width="80px">
                     <el-form-item>
                        <span slot="label">
                            <span style="color:red">*</span>
                            <span>旧密码</span>
                        </span>
                        <el-input v-model="form.description" placeholder="请输入旧密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <span slot="label">
                            <span style="color:red">*</span>
                            <span>新密码</span>
                        </span>
                        <el-input v-model="form.description" placeholder="请输入新密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <span slot="label">
                            <span style="color:red">*</span>
                            <span>确认密码</span>
                        </span>
                        <el-input v-model="form.description"></el-input>
                    </el-form-item>
                   
                </el-form>
                <div style="text-align:center; margin-top:40px">
                    <el-button class="form-item-btn_ok" type="primary" @click="onSubmit">确认</el-button>
                    <el-button class="form-item-btn_cancel" type="primary">取消</el-button>
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
}
.form-item-btn_cancel {
    position: relative;
    margin-left: 30px;
}

</style>

