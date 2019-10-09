<template>
  <el-header>
    <router-link
      to="/index"
      class="logo"
    >
      后台管理系统
    </router-link>

    <el-dropdown
      trigger="click"
      @command="handleCommand"
    >
      <span>
        管理员
        <i class="el-icon-arrow-down el-icon--right" />
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="0">
          个人资料
        </el-dropdown-item>
        <el-dropdown-item command="1">
          修改密码
        </el-dropdown-item>
        <el-dropdown-item
          divided
          command="2"
        >
          安全退出
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-header>
</template>

<script>
    export default {
        methods: {
            handleCommand: function (command) {
                if (command === '0') {
                    console.log('个人资料');
                } else if (command === '1') {
                    console.log('修改密码');
                } else if (command === '2') {
                    this.get('/logout').finally(() => {
                        sessionStorage.removeItem('token');
                        this.$router.push({
                            name: 'login'
                        });
                    });
                }
            }
        }
    };
</script>

<style scoped lang="scss">
  .el-header {
    border-bottom: 1px solid #101117;
    background: linear-gradient(90deg, #1d1e23, #3f4045);
    line-height: 60px;

    .logo {
      float: left;
      color: #e2e2e2;
      font-size: 22px;
      text-decoration: none;
    }

    .el-dropdown {
      float: right;

      span {
        color: #e2e2e2;
        cursor: pointer;
      }
    }
  }
</style>