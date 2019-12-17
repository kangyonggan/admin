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
          <div class="third-links">
            <label>其他账号登录：</label>
            <img
              id="qqLoginBtn"
              src="../assets/images/qq.png"
              @click="qqLogin"
            >
            <svg
              height="16"
              width="16"
              style="margin-left: 8px;"
              @click="githubLogin"
            >
              <path
                fill-rule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
              />
            </svg>
          </div>
        </el-form>
      </el-card>
    </el-col>
  </div>
</template>

<script>
    import 'element-ui/lib/theme-chalk/display.css';
    import qs from 'qs';

    export default {
        data() {
            return {
                loading: false,
                params: {},
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
            submit: function () {
                this.$refs.form.validate((valid) => {
                    if (!valid) {
                        return;
                    }

                    this.loading = true;
                    this.axios.post('login', this.params).then((data) => {
                        this.$store.commit('setUser', data.user);
                        this.$store.commit('setMenus', data.menus);
                        this.$router.push({
                            path: '/'
                        });
                    }).catch(res => {
                        this.error(res.respMsg);
                    }).finally(() => {
                        this.loading = false;
                    });
                });
            },
            qqLogin() {
                // eslint-disable-next-line
                QC.Login.showPopup({
                    appId: '101828246',
                    redirectURI: 'https://kangyonggan.com/admin/login'
                });
            },
            githubLogin() {
                window.open('https://github.com/login/oauth/authorize?client_id=0c9e693180e5376a2ae7&redirect_uri=https://kangyonggan.com/admin/login');
            },
            callbackLogin(url, params) {
                this.loading = true;
                this.axios.post(url, params).then((data) => {
                    this.$store.commit('setUser', data.user);
                    this.$store.commit('setMenus', data.menus);
                    this.$router.push({
                        path: '/'
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
            let hash = this.$route.hash;
            if (hash) {
                hash = hash.replace('#', '');
                let params = qs.parse(hash);
                // QQ回调
                this.callbackLogin('qqLogin', {'accessToken': params.access_token, 'expiresIn': params.expires_in});
                return;
            }

            let code = this.$route.query.code;
            if (code) {
                this.callbackLogin('githubLogin', {'code': code});
            }
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

    .third-links {
      margin-top: 10px;
      position: relative;
      padding-left: 100px;

      label {
        position: absolute;
        left: 0;
        top: -1px;
        font-size: 13px;
        color: #595959;
      }

      img {
        cursor: pointer;
      }
    }
  }
</style>
