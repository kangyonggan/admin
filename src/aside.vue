<template>
  <el-collapse-transition>
    <el-menu
      background-color="#1d1e23"
      text-color="#d5d5d5"
      active-text-color="#fff"
      :unique-opened="true"
      :collapse="isCollapse"
      :style="{width: isCollapse ? '' : '220px'}"
    >
      <el-submenu
        v-for="menu in menus"
        :key="menu.code"
        :index="menu.code"
      >
        <template slot="title">
          <i :class="menu.icon" />
          <span slot="title">{{ menu.name }}</span>
        </template>
        <el-menu-item-group
          v-for="subMenu in menu.children"
          :key="subMenu.code"
        >
          <el-menu-item>{{ subMenu.name }}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <div
        class="collapse"
        @click="isCollapse = !isCollapse"
      >
        <el-tooltip
          class="item"
          effect="dark"
          content="收缩侧栏"
          placement="right-end"
        >
          <i
            class="el-icon-d-arrow-left"
            v-show="!isCollapse"
          />
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="展开侧栏"
          placement="right-end"
        >
          <i
            class="el-icon-d-arrow-right"
            v-show="isCollapse"
          />
        </el-tooltip>
      </div>
    </el-menu>
  </el-collapse-transition>
</template>

<script>
    import ElCollapseTransition from 'element-ui/lib/transitions/collapse-transition';

    export default {
        components: {ElCollapseTransition},
        data() {
            return {
                isCollapse: document.body.clientWidth < 800,
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
        },
        mounted() {
            const that = this;
            window.onresize = () => {
                return (() => {
                    that.isCollapse = document.body.clientWidth < 800;
                })();
            };
        }
    };
</script>

<style scoped lang="scss">
  .el-menu {
    min-height: calc(100vh - 60px);

    .collapse {
      cursor: pointer;
      text-align: center;
      border-top: 1px solid #282828;
      border-bottom: 1px solid #2d2d2d;
      line-height: 30px;

      i {
        color: #d5d5d5;
        font-size: 12px;
      }
    }
  }
</style>