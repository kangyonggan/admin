<template>
  <el-menu
    background-color="#1d1e23"
    text-color="#d5d5d5"
    active-text-color="#fff"
    :unique-opened="true"
  >
    <el-submenu
      v-for="menu in menus"
      :key="menu.code"
      :index="menu.code"
    >
      <template slot="title">
        <i :class="menu.icon"/>
        <span slot="title">{{ menu.name }}</span>
      </template>
      <el-menu-item-group
        v-for="subMenu in menu.children"
        :key="subMenu.code"
      >
        <el-menu-item>{{ subMenu.name }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
    export default {
        data() {
            return {
                menus: [{
                    name: '系统',
                    code: 'SYSTEM',
                    icon: 'el-icon-setting',
                    children: [{
                        name: '用户管理',
                        code: 'SYSTEM_USER'
                    }, {
                        name: '角色管理',
                        code: 'SYSTEM_ROLE'
                    }, {
                        name: '菜单管理',
                        code: 'SYSTEM_MENU'
                    }, {
                        name: '字典管理',
                        code: 'SYSTEM_DICT'
                    }]
                }, {
                    name: '网站',
                    code: 'SITES',
                    icon: 'el-icon-menu',
                    children: [{
                        name: '文章管理',
                        code: 'SITES_ARTICLE'
                    }, {
                        name: '小说管理',
                        code: 'SITES_NOVEL'
                    }]
                }]
            };
        }
    };
</script>

<style scoped lang="scss">
  .el-menu {
    width: 220px;
    height: calc(100vh - 60px);
  }
</style>