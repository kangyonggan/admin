<template>
  <el-breadcrumb>
    <span style="float: left;margin-right: 15px;">当前位置：</span>
    <el-breadcrumb-item
      v-for="(breadcrumb, index) in breadcrumbs"
      :key="index"
    >
      <i :class="breadcrumb.icon" />{{ breadcrumb.name }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
    export default {
        data() {
            return {
                breadcrumbs: [],
                menus: []
            };
        },
        methods: {
            getBreadcrumbs: function (route, menus) {
                let breadcrumbs = [];
                if (!route.name) {
                    breadcrumbs.push(route.meta);
                    return breadcrumbs;
                }

                for (let i in menus) {
                    let menu = menus[i];
                    if (menu.code === route.name) {
                        breadcrumbs.push(menu);
                        return breadcrumbs;
                    }
                    if (menu.children) {
                        const subBreadcrumbs = this.getBreadcrumbs(route, menu.children);
                        if (subBreadcrumbs.length) {
                            breadcrumbs.push(menu);
                            breadcrumbs = breadcrumbs.concat(subBreadcrumbs);
                            return breadcrumbs;
                        }
                    }
                }

                return breadcrumbs;
            },
            setTitle: function () {
                if (this.breadcrumbs.length) {
                    this.util.title(this.breadcrumbs[this.breadcrumbs.length - 1].name);
                }
            }
        },
        mounted() {
            this.breadcrumbs = this.getBreadcrumbs(this.$route, this.menus);
            this.setTitle();
        },
        watch: {
            '$route'(newRoute) {
                this.breadcrumbs = this.getBreadcrumbs(newRoute, this.menus);
                this.setTitle();
            },
            '$store.state.menus': function () {
                this.menus = this.$store.getters.getMenus;
                this.breadcrumbs = this.getBreadcrumbs(this.$route, this.menus);
                this.setTitle();
            }
        }
    };
</script>

<style scoped lang="scss">
  .el-breadcrumb {
    line-height: 35px;
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;
  }
</style>