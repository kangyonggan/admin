<template>
  <base-form
    :params="params"
    :rules="rules"
    :method="params.id ? 'PUT' : 'POST'"
    url="/sites/album"
    @success="handleSuccess"
    v-loading="loading"
  >
    <base-input
      v-if="params.id"
      label="ID"
      v-model="params.id"
      prop="id"
      readonly
    />
    <base-input
      label="名称"
      v-model="params.name"
      prop="name"
    />
    <base-input
      label="封面"
      v-model="params.cover"
      prop="cover"
    />
    <el-form-item
      prop="content"
      style="margin-top: 35px;"
    >
      <el-upload
        :action="axios.defaults.baseURL + 'fileUpload/album'"
        list-type="picture-card"
        :file-list="fileList"
        :before-upload="beforeUpload"
        :on-success="uploadSuccess"
        :before-remove="beforeRemove"
        :on-preview="handlePreview"
      >
        <i class="el-icon-plus" />
      </el-upload>
      <el-dialog
        :visible.sync="dialogVisible"
        size="tiny"
        :title="dialogName"
      >
        <img
          width="100%"
          :src="dialogImageUrl"
        >
      </el-dialog>
    </el-form-item>
  </base-form>
</template>

<script>
    export default {
        data() {
            return {
                loading: false,
                params: {},
                fileList: [],
                content: [],
                rules: {
                    name: [
                        {required: true, message: '名称为必填项'},
                        {max: 64, message: '名称最多为64位'}
                    ],
                    cover: [
                        {required: true, message: '封面为必填项'},
                        {max: 256, message: '封面最多为256位'}
                    ],
                    content: [
                        {required: true, message: '必须选择图片'}
                    ]
                },
                imgTypes: [
                    'image/gif',
                    'image/jpeg',
                    'image/bmp',
                    'image/png',
                    'image/webp'
                ],
                dialogImageUrl: '',
                dialogVisible: false,
                dialogName: ''
            };
        },
        methods: {
            handleSuccess() {
                this.$router.push({
                    path: '/sites/album'
                });
            },
            beforeUpload(file) {
                if (!this.imgTypes.includes(file.type)) {
                    this.error('只能选择 gif/jpg/jpeg/bmp/png/webp 格式的图片!');
                    return false;
                }
                if (file.size / 1024 / 1024 > 2) {
                    this.error('图片大小不能超过 2MB!');
                    return false;
                }

                return true;
            },
            uploadSuccess(res, file) {
                if (res.respCo !== '0000') {
                    this.error(res.respMsg);
                    return;
                }

                this.content.push({
                    name: file.raw.name,
                    originUrl: res.data.originUrl,
                    thumbUrl: res.data.thumbUrl
                });

                this.params.content = JSON.stringify(this.content);
            },
            beforeRemove(file) {
                if (file.raw && !file.response) {
                    return true;
                }
                console.log(11);
                return this.$confirm('删除图片' + file.name + '，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let url;
                    if (file.response) {
                        // 新上传的
                        url = file.response.data.originUrl;
                    } else {
                        url = file.originUrl;
                    }
                    for (let i = 0; i < this.content.length; i++) {
                        if (url.indexOf(this.content[i].originUrl) > -1) {
                            this.content.splice(i, 1);
                            this.params.content = JSON.stringify(this.content);
                            return;
                        }
                    }
                }).catch(() => {
                });
            },
            handlePreview(file) {
                if (file.response) {
                    // 新上传的
                    this.dialogName = this.axios.defaults.baseURL + file.response.data.originUrl + '  (' + file.name + ')';
                    this.dialogImageUrl = this.axios.defaults.baseURL + file.response.data.originUrl;
                } else {
                    this.dialogName = file.originUrl + '  (' + file.name + ')';
                    this.dialogImageUrl = file.originUrl;
                }
                this.dialogVisible = true;
            }
        },
        mounted() {
            let id = this.$route.params.id;
            if (id) {
                this.loading = true;
                this.axios.get('/sites/album/' + id).then(data => {
                    data.album.createdTime = undefined;
                    data.album.updatedTime = undefined;
                    this.params = data.album;
                    this.content = JSON.parse(this.params.content);
                    this.fileList = JSON.parse(this.params.content);
                    this.fileList.forEach(file => {
                        file.url = this.axios.defaults.baseURL + file.thumbUrl;
                        file.originUrl = this.axios.defaults.baseURL + file.originUrl;
                    });
                }).catch(res => {
                    this.error(res.respMsg);
                }).finally(() => {
                    this.loading = false;
                });
            }
        }
    };
</script>
