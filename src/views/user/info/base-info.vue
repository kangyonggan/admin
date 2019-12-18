<template>
  <base-form
    :params="params"
    :rules="rules"
    method="PUT"
    url="/user/info"
    @success="handleSuccess"
    v-loading="loading"
  >
    <base-input
      label="账号"
      v-model="params.account"
      prop="account"
    />
    <base-input
      label="姓名"
      v-model="params.name"
      prop="name"
    />
    <base-avatar
      label="头像"
      v-model="params.avatar"
      prop="avatar"
    />
  </base-form>
</template>

<script>
    export default {
        data() {
            return {
                loading: false,
                params: {},
                oldAccount: '',
                rules: {
                    account: [
                        {required: true, message: '账号为必填项'},
                        {pattern: /^[a-zA-Z][a-zA-Z0-9]{4,19}$/, message: '账号必须是5至20位字母和数字组成，且以字母开头'},
                        {validator: this.validateAccount}
                    ],
                    name: [
                        {required: true, message: '姓名为必填项'},
                        {max: 20, message: '姓名最多为20位'},
                    ]
                }
            };
        },
        methods: {
            validateAccount: function (rule, value, callback) {
                if (!value || value === this.oldAccount) {
                    callback();
                    return;
                }

                this.axios.get('validate/account?account=' + value).then(() => {
                    callback();
                }).catch(res => {
                    callback(new Error(res.respMsg));
                });
            },
            handleSuccess() {
                this.success('基础信息更新成功');
                this.$store.commit('setUser', this.params);
            }
        },
        mounted() {
            let user = this.$store.getters.getUser;
            this.oldAccount = user.account;
            this.params = Object.assign({}, user);
        }
    };
</script>
