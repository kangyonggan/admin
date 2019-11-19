<template>
  <el-collapse-transition>
    <el-menu
      background-color="#1d1e23"
      text-color="#b5b5b5"
      active-text-color="#fff"
      :unique-opened="true"
      :collapse="isCollapse"
      :default-active="active"
      :style="{width: isCollapse ? '' : '200px'}"
      router
    >
      <template v-for="menu in menus">
        <el-menu-item
          v-if="!menu.children || !menu.children.length"
          :index="menu.path"
          :key="menu.name"
        >
          <i
            v-if="menu.icon"
            :class="menu.icon"
          />
          <span slot="title">{{ menu.title }}</span>
        </el-menu-item>

        <menus
          v-else
          :key="menu.name"
          :parent-menu="menu"
        />
      </template>
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
    import Menus from './menus';
    import {routers} from '../../router';

    export default {
        components: {ElCollapseTransition, Menus},
        data() {
            return {
                active: '',
                menus: this.$store.getters.getMenus,
                isCollapse: document.body.clientWidth < 910
            };
        },
        methods: {
          setActivePathByName(route, from) {
              for (let i = 0; i < from.length; i++) {
                  let item = from[i];
                  if (item.meta && !item.meta.title && item.meta.name === route.meta.name) {
                      this.active = '/' + item.path;
                      return true;
                  }
                  if (item.children && item.children.length) {
                      let res = this.setActivePathByName(route, item.children);
                      if (res) {
                          return true;
                      }
                  }
              }

              this.active = route.path;
          }
        },
        watch: {
            '$store.state.smallScreen': function () {
                this.isCollapse = this.$store.getters.getSmallScreen;
            },
            '$route'(newRoute) {
                if (newRoute.meta.title) {
                    this.setActivePathByName(newRoute, routers);
                } else {
                    this.active = newRoute.path;
                }
            }
        },
        mounted() {
            if (this.$route.meta.title) {
                this.setActivePathByName(this.$route, routers);
            } else {
                this.active = this.$route.path;
            }
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