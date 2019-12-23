<template>
  <div class="form-panel">
    <el-form>
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
      />
      <base-input
        label="应用名称"
        v-model="params.name"
        prop="name"
        readonly
      />
      <base-input
        label="重定向地址"
        v-model="params.redirectUrl"
        prop="redirectUrl"
        readonly
      />
      <img
        v-if="params.icon"
        :src="axios.defaults.baseURL + params.icon"
        class="avatar"
      >
    </el-form>

    <el-button
      :disabled="params.status!=='I'"
      style="margin-top: 30px;"
      v-loading="loading"
      type="success"
      @click="check('Y')"
    >
      <i class="el-icon-check" />
      审核通过
    </el-button>

    <el-button
      :disabled="params.status!=='I'"
      style="margin-top: 30px;"
      v-loading="loading"
      type="danger"
      @click="check('F')"
    >
      <i class="el-icon-close" />
      审核失败
    </el-button>

    <el-button
      :disabled="params.status==='I'"
      style="margin-top: 30px;"
      v-loading="loading"
      type="warning"
      @click="check('I')"
    >
      <i class="el-icon-refresh-left" />
      撤销审核
    </el-button>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                loading: false,
                params: {}
            };
        },
        methods: {
            check(status) {
                this.loading = true;
                this.axios.put('dev/oauth2AppCheck/' + this.params.id + '/check/' + status).then(() => {
                    this.$router.push({
                        path: '/dev/oauth2AppCheck'
                    });
                }).catch(res => {
                    this.error(res.respMsg);
                }).finally(() => {
                    this.loading = false;
                });
            }
        },
        mounted() {
            let id = this.$route.params.id;
            if (id) {
                this.loading = true;
                this.axios.get('dev/oauth2AppCheck/' + id).then(data => {
                    this.params = data.appInfo;
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

<style scoped lang="scss">
  .form-panel {
    max-width: 800px;
    margin: 0 auto;
  }

  .avatar {
    width: 180px;
    height: 180px;
    display: block;
  }
</style>
