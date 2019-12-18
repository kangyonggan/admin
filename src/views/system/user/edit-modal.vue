<template>
  <base-modal
    ref="modal"
    title="编辑用户"
    :params="params"
    :rules="rules"
    url="system/user"
    method="put"
    @success="handleSuccess"
  >
    <base-input
      label="ID"
      v-model="params.id"
      prop="id"
      readonly
    />
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
    <base-input
      label="电子邮箱"
      v-model="params.email"
      prop="email"
      readonly
    />
    <base-input
      label="头像"
      v-model="params.avatar"
      prop="avatar"
      readonly
    />
  </base-modal>
</template>

<script>
    export default {
        data() {
            return {
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
            show: function (row) {
                this.oldAccount = row.account;
                this.params = {
                    id: row.id,
                    account: row.account,
                    name: row.name,
                    email: row.email,
                    avatar: row.avatar
                };
                this.$refs.modal.show();
            },
            handleSuccess(data) {
                this.$emit('success', data);
            }
        }
    };
</script>