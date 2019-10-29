<template>
  <el-col>
    <el-col
      :xs="0"
      :sm="2"
      :md="4"
      :lg="6"
      :xl="6"
      style="height: 1px;"
    />
    <el-col
      :xs="24"
      :sm="20"
      :md="16"
      :lg="12"
      :xl="12"
    >
      <el-form
        ref="form"
        :model="params"
        :rules="rules"
      >
        <slot />
      </el-form>
      <el-button
        style="margin-top: 30px;"
        v-loading="loading"
        type="primary"
        @click="submit"
      >
        提 交
      </el-button>
    </el-col>
    <el-col
      :xs="0"
      :sm="2"
      :md="4"
      :lg="6"
      :xl="6"
      style="height: 1px;"
    />
  </el-col>
</template>

<script>
    export default {
        props: {
            url: {
                required: true,
                type: String
            },
            method: {
                required: false,
                type: String,
                default: 'POST',
                validator(value) {
                    return 'POST,PUT'.indexOf(value.toUpperCase()) !== -1;
                }
            },
            params: {
                required: true,
                type: Object
            },
            rules: {
                required: false,
                type: Object,
                default: function () {
                    return {};
                }
            }
        },
        data() {
            return {
                loading: false
            };
        },
        methods: {
            submit: function () {
                this.$refs.form.validate((valid) => {
                    if (!valid) {
                        return;
                    }

                    this.loading = true;
                    this.axios.request({
                        url: this.url,
                        method: this.method,
                        data: this.params
                    }).then(data => {
                        this.$emit('success', data);
                    }).catch(res => {
                        this.error(res.respMsg);
                    }).finally(() => {
                        this.loading = false;
                    });
                });
            }
        },
        mounted() {
            this.$refs.form.clearValidate();
        }
    };
</script>
