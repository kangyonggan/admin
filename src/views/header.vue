<template>
  <el-header>
    <router-link
      to="/"
      class="logo"
    >
      后台管理系统
    </router-link>

    <el-menu
      mode="horizontal"
      background-color="#333"
      text-color="#e2e2e2"
    >
      <el-submenu index="0">
        <template slot="title">
          管理员
        </template>
        <el-menu-item>
          <i class="el-icon-lock" />
          安全退出
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-header>
</template>

<script>
    export default {};
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

    .el-menu {
      float: right;
    }

    .el-menu.el-menu--horizontal {
      border-bottom: 0;
    }
  }
</style>