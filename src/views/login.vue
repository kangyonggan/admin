<template>
  <div class="login-container">
    <el-col
      :xl="15"
      :lg="15"
      :md="12"
      :sm="9"
      :xs="1"
    >
      &nbsp;
    </el-col>
    <el-col
      :xl="6"
      :lg="6"
      :md="6"
      :sm="9"
      :xs="22"
    >
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
            @on-enter="submit"
          />
          <base-input
            style="margin-top: 30px;"
            type="password"
            label="密码"
            v-model="params.password"
            prop="password"
            @on-enter="submit"
          />
          <el-button
            v-loading="loading"
            type="primary"
            size="medium"
            @click="submit"
          >
            登录
          </el-button>
        </el-form>
      </el-card>
    </el-col>

    <base-auth-code
      ref="authCode"
      @success="login"
    />
  </div>
</template>

<script>
    import 'element-ui/lib/theme-chalk/display.css';

    export default {
        data() {
            return {
                loading: false,
                params: {},
                rules: {
                    account: [
                        {required: true, message: '账号为必填项'},
                        {pattern: /^[a-zA-Z][a-zA-Z0-9]{4,19}$/, message: '账号必须是以字母开头的5至20位字母和数字组成'}
                    ],
                    password: [
                        {required: true, message: '密码为必填项'},
                        {pattern: /^[a-zA-Z0-9]{5,20}$/, message: '密码必须是5至20位字母和数字组成'}
                    ]
                }
            };
        },
        methods: {
            submit: function () {
                this.$refs.form.validate((valid) => {
                    if (!valid) {
                        return;
                    }
                    this.$refs.authCode.show();
                });
            },
            login() {
                this.loading = true;
                this.axios.post('login', this.params).then((data) => {
                    this.$store.commit('setUser', data.user);
                    this.$store.commit('setMenus', data.menus);
                    let redirectUrl = this.$route.query.redirectUrl || '/';
                    this.$router.push({
                        path: redirectUrl
                    });
                }).catch(res => {
                    this.error(res.respMsg);
                }).finally(() => {
                    this.loading = false;
                });
            }
        },
        mounted() {
            this.util.title('用户登录');
        }
    };
</script>

<style scoped lang="scss">
  .login-container {
    width: 100%;
    height: 100%;
    background: url('../assets/images/login_bg.jpg') center no-repeat;
    background-size: cover;
  }

  .el-card {
    max-width: 370px;
    min-width: 320px;
    margin-top: 35%;

    .el-card__header {
      font-weight: bold;
    }

    .el-button {
      width: 100%;
      margin: 10px 0;
    }
  }
</style>
