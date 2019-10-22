<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="550px"
  >
    <el-form
      ref="form"
      :model="params"
      :rules="rules"
    >
      <slot />
    </el-form>
    <span slot="footer">
      <el-button
        v-loading="loading"
        type="primary"
        @click="submit"
      >
        确 定
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
    export default {
        props: {
            title: {
                required: true,
                type: String
            },
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
                dialogVisible: false,
                loading: false
            };
        },
        methods: {
            show: function () {
                this.dialogVisible = true;
                this.$nextTick(function () {
                    this.$refs.form.clearValidate();
                });
            },
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
                        this.dialogVisible = false;
                        this.$emit('success', data);
                    }).catch(res => {
                        this.error(res.respMsg);
                    }).finally(() => {
                        this.loading = false;
                    });
                });
            }
        }
    };
</script>