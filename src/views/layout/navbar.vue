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
        {{ user.name }}
        <i class="el-icon-arrow-down el-icon--right" />
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="0">
          安全退出
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-header>
</template>

<script>
    export default {
        data() {
            return {
                user: JSON.parse(localStorage.getItem('user'))
            };
        },
        methods: {
            handleCommand: function (command) {
                if (command === '0') {
                    this.axios.get('logout').finally(() => {
                        localStorage.removeItem('token');
                        this.$router.push({
                            path: '/login'
                        });
                    });
                }
            }
        }
    };
</script>

<style lang="scss">
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

      .el-loading-mask {
        background: none;
      }
    }
  }
</style>