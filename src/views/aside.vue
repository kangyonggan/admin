<template>
  <el-collapse-transition>
    <el-menu
      background-color="#1d1e23"
      text-color="#b5b5b5"
      active-text-color="#fff"
      :unique-opened="true"
      :collapse="isCollapse"
      :default-active="$route.path"
      :style="{width: isCollapse ? '' : '200px'}"
      router
    >
      <el-submenu
        v-for="menu in menus"
        :key="menu.name"
        :index="menu.name"
      >
        <template slot="title">
          <i :class="menu.icon" />
          <span slot="title">{{ menu.name }}</span>
        </template>
        <el-menu-item-group
          v-for="subMenu in menu.children"
          :key="subMenu.path"
        >
          <el-menu-item :index="subMenu.path">
            {{ subMenu.name }}
          </el-menu-item>
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
                    icon: 'el-icon-setting',
                    children: [{
                        name: '用户管理',
                        path: '/system/user'
                    }, {
                        name: '角色管理',
                        path: '/system/role'
                    }, {
                        name: '菜单管理',
                        path: '/system/menu'
                    }, {
                        name: '字典管理',
                        path: '/system/dict'
                    }]
                }, {
                    name: '网站',
                    icon: 'el-icon-menu',
                    children: [{
                        name: '文章管理',
                        path: '/sites/article'
                    }, {
                        name: '小说管理',
                        path: '/sites/novel'
                    }, {
                        name: '相册管理',
                        path: '/sites/album'
                    }, {
                        name: '视频管理',
                        path: '/sites/video'
                    }]
                }, {
                    name: '我的',
                    icon: 'el-icon-user',
                    children: [{
                        name: '个人资料',
                        path: '/user/profile'
                    }, {
                        name: '修改密码',
                        path: '/user/password'
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
      border-top: 1px solid #101117;
      border-bottom: 1px solid #101117;
      line-height: 30px;

      i {
        color: #ccc;
        font-size: 12px;
      }
    }
  }
</style>