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
            },
            submit: function () {
                this.$refs.form.validate((valid) => {
                    if (!valid) {
                        return;
                    }

                    this.loading = true;
                    this.axios.post('/system/user', this.params).then(data => {
                        this.dialogVisible = false;
                        this.$emit('success', data);
                    }).catch(data => {
                        this.error(data.respMsg);
                    }).finally(() => {
                        this.loading = false;
                    });
                });
            }
        }
    };
</script>