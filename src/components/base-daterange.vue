<template>
  <el-form-item
    :label="label"
    :prop="prop"
  >
    <el-date-picker
      :value="value"
      @input="$emit('input', $event)"
      type="daterange"
      value-format="yyyy-MM-dd"
      unlink-panels
      range-separator="至"
      :start-placeholder="startPlaceholder ? startPlaceholder : '请选择开始日期'"
      :end-placeholder="endPlaceholder ? endPlaceholder : '请选择结束日期'"
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
                type: Array,
                default: function () {
                    return [];
                }
            },
            startPlaceholder: {
                required: false,
                type: String,
                default: undefined
            },
            endPlaceholder: {
                required: false,
                type: String,
                default: undefined
            }
        }
    };
</script>