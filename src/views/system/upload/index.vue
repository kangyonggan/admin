<template>
  <el-upload
    :action="axios.defaults.baseURL + 'fileUpload'"
    :on-success="uploadSuccess"
  >
    <i class="el-icon-upload2" />
  </el-upload>
</template>

<script>
    export default {
        methods: {
            uploadSuccess() {
                this.success('上传成功');
            }
        }
    };
</script>
