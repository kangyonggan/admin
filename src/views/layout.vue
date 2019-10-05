<template>
  <div>
    <Heder />
    <el-container>
      <Aside />
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
    import Heder from './header';
    import Aside from './aside';

    export default {
        components: {Heder, Aside}
    };
</script>

<style scoped lang="scss">
  .el-container {
    width: 100%;
  }
</style>