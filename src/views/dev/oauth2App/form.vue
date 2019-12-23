<template>
  <base-form
    :params="params"
    :rules="rules"
    :method="params.id ? 'PUT' : 'POST'"
    url="/dev/oauth2App"
    @success="handleSuccess"
    v-loading="loading"
  >
    <base-input
      v-if="params.id"
      label="APP ID"
      v-model="params.clientId"
      prop="clientId"
      readonly
    />
    <base-input
      v-if="params.id"
      label="APP Secret"
      v-model="params.clientSecret"
      prop="clientSecret"
      readonly
    >
      <a
        @click="refreshSecret"
        style="position: absolute;right: 1px;top: 1px;
        cursor: pointer;text-decoration: underline;color: red"
      >
        刷新
      </a>
    </base-input>
    <base-input
      label="应用名称"
      v-model="params.name"
      prop="name"
    />
    <base-input
      label="重定向地址"
      v-model="params.redirectUrl"
      prop="callbackUrl"
    />
    <base-avatar
      label="应用图标"
      v-model="params.icon"
      prop="icon"
    />
  </base-form>
</template>

<script>
    export default {
        data() {
            return {
                loading: false,
                params: {
                    clientSecret: '',
                    name: '',
                    callbackUrl: '',
                    icon: ''
                },
                rules: {
                    name: [
                        {required: true, message: '应用名称为必填项'},
                        {max: 20, message: '应用名称最多为64位'}
                    ],
                    redirectUrl: [
                        {required: true, message: '重定向地址为必填项'},
                        {max: 1024, message: '重定向最多为1024位'}
                    ],
                    icon: [
                        {required: true, message: '应用图标为必填项'}
                    ]
                }
            };
        },
        methods: {
            handleSuccess() {
                this.$router.push({
                    path: '/dev/oauth2App'
                });
            },
            refreshSecret() {
                this.$confirm('之前的APP Secret将无法使用，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axios.put('dev/oauth2App/' + this.params.id + '/refreshSecret').then((data) => {
                        this.success('刷新成功！');
                        console.log(data.clientSecret);
                        this.params.clientSecret = data.clientSecret;
                    }).catch(res => {
                        this.error(res.respMsg);
                    });
                });
            }
        },
        mounted() {
            let id = this.$route.params.id;
            if (id) {
                this.loading = true;
                this.axios.get('dev/oauth2App/' + id).then(data => {
                    data.appInfo.createdTime = undefined;
                    data.appInfo.updatedTime = undefined;
                    Object.assign(this.params, data.appInfo);
                }).catch(res => {
                    this.error(res.respMsg);
                }).finally(() => {
                    this.loading = false;
                });
            }
        }
    };
</script>

