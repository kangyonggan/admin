<template>
  <el-form-item
    :label="label"
    :prop="prop"
  >
    <el-input
      :value="value"
      @input="$emit('input', $event)"
      :placeholder="placeholder ? placeholder : '请输入' + label"
      clearable
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
                type: [String, Number],
                default: ''
            },
            placeholder: {
                required: false,
                type: String,
                default: undefined
            }
        }
    };
</script>