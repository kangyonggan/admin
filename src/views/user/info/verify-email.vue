<template>
  <base-form
    ref="form"
    :params="params"
    :rules="rules"
    method="PUT"
    url="/user/info/bindEmail"
    @success="handleSuccess"
    v-loading="loading"
  >
    <base-input
      label="姓名"
      v-model="params.name"
      prop="name"
      readonly
    />
    <base-input
      label="电子邮箱"
      v-model="params.email"
      prop="email"
    />
    <base-input
      label="邮箱验证码"
      v-model="params.authCode"
      prop="authCode"
    >
      <el-button
        plain
        class="sendBtn"
        @click="sendAuthCode"
      >
        {{ text }}
      </el-button>
    </base-input>

    <base-auth-code
      ref="authCode"
      @success="send"
    />
  </base-form>
</template>

<script>
    export default {
        data() {
            return {
                loading: false,
                params: {},
                oldEmail: '',
                text: '发送',
                rules: {
                    email: [
                        {required: true, message: '电子邮箱为必填项'},
                        {max: 128, message: '电子邮箱最多为128位'},
                        {pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '电子邮箱格式错误'},
                        {validator: this.validateEmail}
                    ],
                    authCode: [
                        {required: true, message: '邮箱验证码为必填项'}
                    ]
                }
            };
        },
        methods: {
            validateEmail: function (rule, value, callback) {
                if (!value || this.oldEmail === value) {
                    callback();
                    return;
                }

                this.axios.get('validate/email?email=' + value).then(() => {
                    callback();
                }).catch(res => {
                    callback(new Error(res.respMsg));
                });
            },
            handleSuccess() {
                this.success('电子邮箱认证成功');
                let user = JSON.parse(localStorage.getItem('user'));
                user.email = this.params.email;
                this.$store.commit('setUser', user);
                this.params.authCode = '';
                this.oldEmail = this.params.email;
            },
            sendAuthCode() {
                let that = this;
                this.$refs.form.validateField('email', function (errMsg) {
                    if (errMsg) {
                        return;
                    }
                    that.$refs.authCode.show();
                });
            },
            send() {
                this.loading = true;
                this.text = '正在发送';
                this.axios.post('email', {email: this.params.email, type: 'BIND_EMAIL'}).then(() => {
                    this.success('邮箱验证码发送成功！');
                }).catch(res => {
                    this.error(res.respMsg);
                }).finally(() => {
                    this.loading = false;
                    this.text = '发送';
                });
            }
        },
        mounted() {
            let user = JSON.parse(localStorage.getItem('user'));
            this.params = Object.assign({}, user);
            this.oldEmail = this.params.email;
        }
    };
</script>

<style scoped lang="scss">
  .sendBtn {
    position: absolute;
    right: 1px;
    top: 41px;
    padding: 11px 20px;
  }
</style>