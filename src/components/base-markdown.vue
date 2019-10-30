<template>
  <el-form-item
    :label="label"
    :prop="prop"
  >
    <mavon-editor
      :value="value"
      :subfield="false"
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