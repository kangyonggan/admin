<template>
  <el-form-item
    :label="label"
    :prop="prop"
  >
    <mavon-editor
      ref="md"
      :value="value"
      :subfield="false"
      @imgAdd="imgAdd"
      @input="$emit('input', $event)"
    />
  </el-form-item>
</template>

<script>
    export default {
        props: {
            prop: {
                required: true,
                type: String
            },
            label: {
                required: true,
                type: String
            },
            value: {
                required: false,
                type: String,
                default: ''
            }
        },
        methods: {
            imgAdd(pos, $file) {
                // 第一步.将图片上传到服务器.
                let formData = new FormData();
                formData.append('file', $file);

                this.axios.post('fileUpload/github', formData).then(data => {
                    // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
                    this.$refs.md.$img2Url(pos, data.url);
                }).catch(res => {
                    this.error(res.respMsg);
                });
            }
        }
    };
</script>

<style scoped lang="scss">
  .markdown-body {
    width: 100%;
    float: left;
    display: block;
    min-height: 500px;
  }
</style>