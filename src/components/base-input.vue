<template>
  <el-form-item
    :label="label"
    :prop="prop"
  >
    <el-input
      :value="value"
      :type="type"
      @input="$emit('input', $event)"
      :placeholder="placeholder ? placeholder : '请输入' + label"
      clearable
      :readonly="readonly"
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
            type: {
                required: false,
                type: String,
                default: 'text'
            },
            placeholder: {
                required: false,
                type: String,
                default: undefined
            },
            readonly: {
                required: false,
                type: Boolean,
                default: false
            }
        }
    };
</script>