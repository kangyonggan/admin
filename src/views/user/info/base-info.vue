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
      readonly
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
                rules: {
                    name: [
                        {required: true, message: '姓名为必填项'},
                        {max: 20, message: '姓名最多为20位'}
                    ]
                }
            };
        },
        methods: {
            handleSuccess() {
                this.success('基础信息更新成功');
                this.$store.commit('setUser', this.params);
            }
        },
        mounted() {
            let user = this.$store.getters.getUser;
            this.params = Object.assign({}, user);
        }
    };
</script>
