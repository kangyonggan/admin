<template>
  <el-header>
    <router-link
      to="/"
      class="logo"
    >
      康永敢控制台
    </router-link>

    <a
      href="/"
      style="margin-left: 65px;color: #fff;text-decoration: none;"
    >
      <i class="el-icon-star-on" />
      网站
    </a>

    <el-dropdown
      trigger="click"
      @command="handleCommand"
    >
      <span>
        {{ $store.getters.getUser.name || $store.getters.getUser.account }}
        <i class="el-icon-arrow-down el-icon--right" />
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="0">
          个人资料
        </el-dropdown-item>
        <el-dropdown-item command="1">
          退出
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <img
      v-if="$store.getters.getUser.avatar"
      class="avatar"
      :src="axios.defaults.baseURL + $store.getters.getUser.avatar"
    >
  </el-header>
</template>

<script>
    export default {
        methods: {
            handleCommand: function (command) {
                if (command === '0') {
                    this.$router.push({
                        path: '/user/info'
                    });
                } else if (command === '1') {
                    this.axios.get('logout').finally(() => {
                        localStorage.removeItem('token');
                        this.$store.commit('setUser', {});
                        this.$router.push({
                            path: '/login',
                            query: {logout: 1}
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

    .avatar {
      float: right;
      width: 36px;
      height: 36px;
      margin: 12px 10px 0 0;
      border-radius: 50%;
      box-shadow: 0 1px 5px rgba(27, 31, 35, .15);
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