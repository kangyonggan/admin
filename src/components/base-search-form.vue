<template>
  <el-form
    :inline="true"
    :model="model"
    ref="form"
  >
    <slot />
    <el-row>
      <el-button
        type="primary"
        @click="$parent.$refs[table].reload(model)"
      >
        查询
      </el-button>
      <el-button
        type="warning"
        @click="$refs.form.resetFields()"
      >
        清空
      </el-button>
      <slot name="actions" />
    </el-row>
  </el-form>
</template>

<script>
    export default {
        props: {
            model: {
                required: true,
                type: Object
            },
            table: {
                required: false,
                type: String,
                default: 'table'
            }
        }
    };
</script>