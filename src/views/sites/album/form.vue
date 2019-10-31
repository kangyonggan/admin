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
        :action="axios.defaults.baseURL + 'fileUpload'"
        list-type="picture-card"
        :file-list="fileList"
        :before-upload="isValid"
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
            isValid(file) {
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
                    url: res.data.url
                });

                this.params.content = JSON.stringify(this.content);
            },
            beforeRemove(file) {
                if (!this.isValid(file)) {
                    return true;
                }
                return this.$confirm('删除图片' + file.name + '，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let url = file.url;
                    if (file.response) {
                        // 新上传的
                        url = file.response.data.url;
                    }
                    for (let i = 0; i < this.content.length; i++) {
                        if (url.indexOf(this.content[i].url) > -1) {
                            this.content.splice(i, 1);
                            this.params.content = JSON.stringify(this.content);
                            return;
                        }
                    }
                });
            },
            handlePreview(file) {
                this.dialogImageUrl = file.url;
                if (file.response) {
                    // 新上传的
                    this.dialogName = this.axios.defaults.baseURL + file.response.data.url + '  (' + file.name + ')';
                } else {
                    this.dialogName = file.url + '  (' + file.name + ')';
                }
                this.dialogVisible = true;
            }
        },
        mounted() {
            let albumId = this.$route.params.albumId;
            if (albumId) {
                this.loading = true;
                this.axios.get('/sites/album/' + albumId).then(data => {
                    data.album.createdTime = undefined;
                    data.album.updatedTime = undefined;
                    this.params = data.album;
                    this.content = JSON.parse(this.params.content);
                    this.fileList = JSON.parse(this.params.content);
                    this.fileList.forEach(file => {
                       file.url = this.axios.defaults.baseURL + file.url;
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
