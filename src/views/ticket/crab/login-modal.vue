<template>
  <base-modal
    ref="modal"
    title="登录12306"
    :params="params"
    :rules="rules"
    url="/ticket/crab/captchaCheck"
    @success="handleSuccess"
    @failure="handleFailure"
  >
    <base-input
      label="用户名"
      v-model="params.username"
      prop="username"
    />
    <base-input
      label="密码"
      v-model="params.password"
      type="password"
      prop="password"
    />
    <base-input
      label="验证码"
      v-model="params.answers"
      placeholder="输入下标1~8，用空格分开，如：2 5"
      prop="answers"
    />
    <el-col
      style="position: relative"
      v-if="captchaPath"
    >
      <img :src="axios.defaults.baseURL + captchaPath">
      <span
        @click="refresh"
        class="refreshBtn"
      >
        <i class="el-icon-refresh" />
      </span>
    </el-col>
  </base-modal>
</template>

<script>
    export default {
        data() {
            return {
                captchaPath: '',
                params: {
                    username: 'kd56110869',
                    password: 'keeo0qkz'
                },
                rules: {
                    username: [
                        {required: true, message: '用户名为必填项'}
                    ],
                    password: [
                        {required: true, message: '密码为必填项'}
                    ],
                    answers: [
                        {required: true, message: '验证码为必填项'}
                    ]
                }
            };
        },
        methods: {
            show: function () {
                this.params = {};
                this.$refs.modal.show();
                this.refresh();
            },
            handleSuccess(data) {
                this.$emit('success', data);
            },
            handleFailure(res) {
                this.captchaPath = res.data.captchaPath;
                this.error(res.respMsg);
                this.params.answers = '';
            },
            refresh() {
                this.axios.get('ticket/crab/loginCaptcha').then(data => {
                    this.captchaPath = data.captchaPath;
                }).catch(res => {
                    this.error(res.respMsg);
                });
            }
        }
    };
</script>

<style scoped lang="scss">
  .refreshBtn {
    position: absolute;
    top: 2px;
    font-weight: bold;
    font-size: 20px;
    left: 270px;
    cursor: pointer;
  }
</style>