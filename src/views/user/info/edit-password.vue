<template>
  <base-form
    :params="params"
    :rules="rules"
    method="PUT"
    url="/user/info/password"
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
      label="新密码"
      type="password"
      v-model="params.password"
      prop="password"
    />
    <base-input
      type="password"
      label="确认密码"
      v-model="params.rePassword"
      prop="rePassword"
    />
  </base-form>
</template>

<script>
    export default {
        data() {
            return {
                loading: false,
                params: {},
                rules: {
                    password: [
                        {required: true, message: '密码为必填项'},
                        {pattern: /^[a-zA-Z0-9]{5,20}$/, message: '密码必须是5至20位字母和数字组成'}
                    ],
                    rePassword: [
                        {required: true, message: '确认密码为必填项'},
                        {validator: this.validatePassword}
                    ]
                }
            };
        },
        methods: {
            validatePassword: function (rule, value, callback) {
                if (!value || value === this.params.password) {
                    callback();
                    return;
                }

                callback(new Error('两次密码不一致'));
            },
            handleSuccess() {
                this.axios.get('logout').finally(() => {
                    localStorage.removeItem('token');
                    this.$router.push({
                        path: '/login'
                    });
                });
            }
        },
        mounted() {
            let user = JSON.parse(localStorage.getItem('user'));
            this.params = Object.assign({}, user);
        }
    };
</script>
