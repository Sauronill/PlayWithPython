<template>
    <div class="login-wrap">
        <div class="ms-login-bg">
            <div class="ms-login">
                <div class="ms-icon">
                    <img src="../../assets/img/Ford-logo.png">
                </div>
                <div class="ms-title">后台管理系统</div>
                <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                    <el-form-item prop="username">
                        <el-input v-model="param.username" placeholder="请输入用户名">
                            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                            type="password"
                            placeholder="请输入密码"
                            v-model="param.password"
                            @keyup.enter.native="submitForm()"
                        >
                            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                        </el-input>
                    </el-form-item>
                    <div class="login-btn">
                        <el-button type="primary" @click="submitForm()">登录</el-button>
                    </div>
                    
                </el-form>
            </div>    
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            param: {
                username: '',
                password: '',
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
        };
    },
    methods: {
        submitForm() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    this.$message.success('登录成功');
                    localStorage.setItem('ms_username', this.param.username);
                    this.$router.push('/');
                } else {
                    this.$message.error('请输入账号和密码');
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/fordbg.jpg);
    background-size: cover;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
    vertical-align: middle;
    font-weight: bold;
}
.ms-icon {
    vertical-align: middle;
    text-align: center;
}
.ms-login-bg {
    position: absolute;
    left: 80%;
    right: 5%;
    bottom: 0;
    top:0;
    border-radius: 5px;
    background: rgba(51, 51, 51, 0.3);
    overflow: hidden;
    text-align: center;
}

.ms-login {
    
    margin-top: 120%;
}

.ms-content {
    padding: 30px 30px;
    vertical-align: middle;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 80%;
    height: 36px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    background-color:rgb(94, 91, 91);
    border-color: rgb(94, 91, 91);
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>