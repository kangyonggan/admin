<template>
  <base-modal
    ref="modal"
    title="新增用户"
    :params="params"
    :rules="rules"
    @success="handleSuccess"
  >
    <base-input
      label="账号"
      v-model="params.account"
      prop="account"
    />
    <base-input
      type="password"
      label="密码"
      v-model="params.password"
      prop="password"
    />
  </base-modal>
</template>

<script>
    export default {
        data() {
            return {
                params: {},
                rules: {
                    account: [
                        {required: true, message: '账号为必填项'},
                        {pattern: /^[a-zA-Z][a-zA-Z0-9]{4,19}$/, message: '账号必须是5至20位字母和数字组成，且以字母开头'},
                        {validator: this.validateAccount}
                    ],
                    password: [
                        {required: true, message: '密码为必填项'},
                        {pattern: /^[a-zA-Z0-9]{5,20}$/, message: '密码必须是5至20位字母和数字组成'}
                    ]
                }
            };
        },
        methods: {
            validateAccount: function (rule, value, callback) {
                if (!value) {
                    callback();
                    return;
                }

                this.axios.get('/validate/account?account=' + value).then(() => {
                    callback();
                }).catch(data => {
                    callback(new Error(data.respMsg));
                });
            },
            show: function () {
                this.params = {};
                this.$refs.modal.show();
            },
            handleSuccess(data) {
                this.$emit('success', data);
            }
        }
    };
</script>