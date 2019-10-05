<template>
  <div class="red">
    <el-button>按钮</el-button>
  </div>
</template>

<script>
    export default {
        mounted() {
            console.log('init');
        }
    };
</script>

<style scoped lang="scss">
  .red {
    color: red;
  }
</style>