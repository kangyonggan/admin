<template>
  <el-collapse-transition>
    <el-menu
      v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0.5)"
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
        v-for="(menu, index) in menus"
        :key="index"
        :index="'index-' + index"
      >
        <template slot="title">
          <i :class="menu.icon" />
          <span slot="title">{{ menu.name }}</span>
        </template>
        <el-menu-item-group
          v-for="(subMenu, idx) in menu.children"
          :key="idx"
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
                loading: false,
                isCollapse: document.body.clientWidth < 910,
                menus: []
            };
        },
        mounted() {
            this.loading = true;
            this.$store.dispatch('getLoginData').then(() => {
                this.menus = this.$store.getters.getMenus;
            }).catch(data => {
                this.error(data.respMsg);
            }).finally(() => {
                this.loading = false;
            });
        },
        watch: {
            '$store.state.smallScreen': function () {
                this.isCollapse = this.$store.getters.getSmallScreen;
            }
        }
    };
</script>

<style lang="scss">
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

    .el-loading-spinner .path {
      stroke: #eaeaea;
    }
  }
</style>