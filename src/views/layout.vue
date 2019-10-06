<template>
  <div>
    <navbar />
    <el-container>
      <sidebar />
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
    import navbar from './navbar';
    import sidebar from './sidebar';

    export default {
        components: {navbar, sidebar}
    };
</script>
