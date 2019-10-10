<template>
  <div class="login-container">
    <el-card>
      <div slot="header">
        用户登录
      </div>
      <el-form
        ref="form"
        :model="params"
        :rules="rules"
        label-position="left"
        label-width="53px"
      >
        <base-input
          label="账号"
          v-model="params.account"
          prop="account"
        />
        <base-input
          style="margin-top: 30px;"
          type="password"
          label="密码"
          v-model="params.password"
          prop="password"
        />
        <el-button
          v-loading="loading"
          type="primary"
          size="medium"
          @click="login"
        >
          登录
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                loading: false,
                params: {
                    account: 'admin',
                    password: 'admin'
                },
                rules: {
                    account: [
                        {required: true, message: '账号为必填项'},
                        {pattern: /^[a-zA-Z][a-zA-Z0-9]{4,19}$/, message: '账号必须是5至20位字母和数字组成，且以字母开头'}
                    ],
                    password: [
                        {required: true, message: '密码为必填项'},
                        {pattern: /^[a-zA-Z0-9]{5,20}$/, message: '密码必须是5至20位字母和数字组成'}
                    ]
                }
            };
        },
        methods: {
            login: function () {
                this.$refs.form.validate((valid) => {
                    if (!valid) {
                        return;
                    }

                    this.loading = true;
                    this.axios.post('/login', this.params).then((data) => {
                        sessionStorage.setItem('token', data.token);
                        this.$router.push({
                            path: '/index'
                        });
                    }).catch(data => {
                        this.error(data.respMsg);
                    }).finally(() => {
                        this.loading = false;
                    });
                });
            }
        }
    };
</script>

<style scoped lang="scss">
  .login-container {
    width: 100%;
    height: 100%;
    background: url('../assets/images/login_bg.jpg') no-repeat;
    background-size: auto;
  }

  .el-card {
    width: 370px;
    float: right;
    margin-right: 15%;
    margin-top: 15%;

    .el-card__header {
      font-weight: bold;
    }

    .el-button {
      width: 100%;
      margin: 10px 0;
    }
  }
</style>
