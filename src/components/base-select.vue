<template>
  <el-form-item
    :label="label"
    :prop="prop"
  >
    <el-select
      :value="value"
      clearable
      @change="$emit('input', $event)"
      :readonly="readonly"
      :placeholder="placeholder ? placeholder : '请选择' + label"
    >
      <el-option
        v-for="item in items"
        :key="item[code]"
        :label="item[name]"
        :value="item[code]"
      />
      <el-option
        v-for="item in enums"
        :key="item.code"
        :label="item.name"
        :value="item.code"
      />
      <slot />
    </el-select>
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
            items: {
                required: false,
                type: Array,
                default: function () {
                    return [];
                }
            },
            code: {
              required: false,
              type: String,
              default: 'code'
            },
            name: {
              required: false,
              type: String,
              default: 'name'
            },
            enum: {
                required: false,
                type: String,
                default: ''
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
        },
        data() {
            return {
                temp: '',
                enums: []
            };
        },
        mounted() {
            if (this.enum) {
                this.axios.get('enum?enumKey=' + this.enum).then(data => {
                    this.enums = data.enums;
                }).catch(res => {
                    this.error(res.respMsg);
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
  .el-select {
    width: 100%;
  }
</style>