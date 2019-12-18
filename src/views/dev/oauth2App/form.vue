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
      label="回调地址"
      v-model="params.callbackUrl"
      prop="callbackUrl"
    />

    <el-form-item
      label="应用图标"
      prop="icon"
      class="icon-item"
    >
      <el-upload
        :action="axios.defaults.baseURL + 'fileUpload'"
        :before-upload="beforeUpload"
        :on-success="uploadSuccess"
        class="avatar-uploader"
        :show-file-list="false"
      >
        <img
          v-if="params.icon"
          :src="axios.defaults.baseURL + params.icon"
          class="avatar"
        >
        <i
          v-else
          class="el-icon-plus avatar-uploader-icon"
        />
      </el-upload>
    </el-form-item>
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
                    callbackUrl: [
                        {required: true, message: '回调地址为必填项'},
                        {max: 1024, message: '回调地址最多为1024位'}
                    ],
                    icon: [
                        {required: true, message: '应用图标为必填项'}
                    ]
                },
                imgTypes: [
                    'image/gif',
                    'image/jpeg',
                    'image/bmp',
                    'image/png',
                    'image/webp'
                ]
            };
        },
        methods: {
            handleSuccess() {
                this.$router.push({
                    path: '/dev/oauth2App'
                });
            },
            beforeUpload(file) {
                if (!this.imgTypes.includes(file.type)) {
                    this.error('只能选择 gif/jpg/jpeg/bmp/png/webp 格式的图片!');
                    return false;
                }
                if (file.size / 1024 / 1024 > 1) {
                    this.error('图片大小不能超过 1MB!');
                    return false;
                }

                return true;
            },
            uploadSuccess(res) {
                if (res.respCo !== '0000') {
                    this.error(res.respMsg);
                    return;
                }

                this.params.icon = res.data.url;
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

<style scoped lang="scss">
  /deep/ .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  /deep/ .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 180px;
    height: 180px;
    display: block;
  }

  /deep/ .icon-item label {
    width: 100%;
    text-align: left;
  }
</style>
