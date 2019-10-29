<template>
  <el-breadcrumb>
    <span style="float: left;margin-right: 15px;">当前位置：</span>
    <el-breadcrumb-item
      v-for="(breadcrumb, index) in breadcrumbs"
      :key="index"
    >
      <i :class="breadcrumb.icon" />{{ breadcrumb.title }}
    </el-breadcrumb-item>
    <el-breadcrumb-item v-if="title">
      {{ title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
    export default {
        data() {
            return {
                breadcrumbs: [],
                title: '',
                menus: JSON.parse(sessionStorage.getItem('menus'))
            };
        },
        methods: {
            getBreadcrumbs: function (route, menus) {
                let breadcrumbs = [];
                if (!route.meta.name) {
                    return breadcrumbs;
                }

                for (let i in menus) {
                    let menu = menus[i];
                    if (menu.name === route.meta.name) {
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
            setTitle: function (route) {
                if (route.meta.title) {
                    this.title = route.meta.title;
                    this.util.title(route.meta.title);
                } else if (this.breadcrumbs.length) {
                    this.util.title(this.breadcrumbs[this.breadcrumbs.length - 1].title);
                    this.title = '';
                } else {
                    this.title = '';
                }
            }
        },
        mounted() {
            this.breadcrumbs = this.getBreadcrumbs(this.$route, this.menus);
            this.setTitle(this.$route);
        },
        watch: {
            '$route'(newRoute) {
                this.breadcrumbs = this.getBreadcrumbs(newRoute, this.menus);
                this.setTitle(newRoute);
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