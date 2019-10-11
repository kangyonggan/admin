<template>
  <el-breadcrumb>
    <span style="float: left;margin-right: 15px;">当前位置：</span>
    <el-breadcrumb-item :to="{ path: '/index' }">
      <i class="el-icon-s-home" />首页
    </el-breadcrumb-item>
    <el-breadcrumb-item
      v-for="(breadcrumb, index) in breadcrumbs"
      :key="index"
    >
      <i :class="breadcrumb.icon" />{{ breadcrumb.title }}
    </el-breadcrumb-item>
    <el-breadcrumb-item v-if="title !== '首页'">
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
                menus: []
            };
        },
        methods: {
            loadBreadcrumbs: function (route) {
                this.title = route.meta.title;
                this.breadcrumbs = [];
                for (let i in this.menus) {
                    for (let j in this.menus[i].children) {
                        let menu = this.menus[i].children[j];
                        if (menu.code === route.name) {
                            this.title = menu.name;
                            this.util.title(this.title);
                            this.breadcrumbs.push({
                                icon: this.menus[i].icon,
                                title: this.menus[i].name
                            });
                            return;
                        }
                    }
                }
                this.util.title(this.title);
            }
        },
        mounted() {
            this.loadBreadcrumbs(this.$route);
        },
        watch: {
            '$route'(newRoute) {
                this.loadBreadcrumbs(newRoute);
            },
            '$store.state.menus': function () {
                this.menus = this.$store.getters.getMenus;
                this.loadBreadcrumbs(this.$route);
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