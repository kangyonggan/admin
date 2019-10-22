<template>
  <base-modal
    ref="modal"
    title="修改密码"
    :params="params"
    :rules="rules"
    :url="'/system/user/' + params.id + '/password'"
    method="put"
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
      readonly
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
                    password: [
                        {required: true, message: '密码为必填项'},
                        {pattern: /^[a-zA-Z0-9]{5,20}$/, message: '密码必须是5至20位字母和数字组成'}
                    ]
                }
            };
        },
        methods: {
            show: function (row) {
                this.params = Object.assign({}, row);
                this.params.password = '';
                this.$refs.modal.show();
            }
        }
    };
</script>