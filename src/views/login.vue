<template>
  <el-card>
    <div slot="header">
      用户登录
    </div>
    <el-form
      ref="form"
      :model="params"
      :rules="rules"
      label-position="left"
      label-width="53px"
    >
      <base-input
        label="账号"
        v-model="params.account"
        prop="account"
      />
      <base-input
        style="margin-top: 30px;"
        type="password"
        label="密码"
        v-model="params.password"
        prop="password"
      />
      <el-button
        type="primary"
        size="medium"
        @click="login"
      >
        登录
      </el-button>
    </el-form>
  </el-card>
</template>

<script>
    export default {
        data() {
            return {
                params: {},
                rules: {
                    account: [
                        {required: true, message: '账号为必填项'},
                        {pattern: /^[a-zA-Z][a-zA-Z0-9]{4,19}$/, message: '账号必须是5至20位字母和数字组成，且以字母开头'}
                    ],
                    password: [
                        {required: true, message: '密码为必填项'},
                        {pattern: /^[a-zA-Z0-9]{5,20}$/, message: '密码必须是5至20位字母和数字组成'}
                    ]
                }
            };
        },
        methods: {
            login: function () {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    };
</script>

<style lang="scss">
  body {
    width: 100%;
    height: 100%;
    background: url('../assets/images/login_bg.jpg') no-repeat;
    background-size: auto;
  }

  .el-card {
    width: 370px;
    float: right;
    margin-right: 15%;
    margin-top: 15%;

    .el-card__header {
      font-weight: bold;
    }

    .el-button {
      width: 100%;
      margin: 10px 0;
    }
  }
</style>
