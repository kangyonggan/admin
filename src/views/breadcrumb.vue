<template>
  <el-breadcrumb>
    <span style="float: left;margin-right: 15px;">当前位置：</span>
    <el-breadcrumb-item :to="{ path: '/' }">
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
                title: ''
            };
        },
        watch: {
            '$route'(newRoute) {
                this.title = newRoute.meta.title;
                this.breadcrumbs = newRoute.meta.breadcrumbs;
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