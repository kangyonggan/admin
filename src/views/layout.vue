<template>
  <div>
    <navbar />
    <el-container>
      <sidebar />
      <el-main
        v-loading="$store.getters.getLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.5)"
      >
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
    import navbar from './navbar';
    import sidebar from './sidebar';
    import {debounce} from 'lodash';

    export default {
        components: {navbar, sidebar},
        methods: {
            windowResize: function () {
                this.$store.commit('setSmallScreen', document.body.clientWidth < 910);
            }
        },
        mounted() {
            window.onresize = debounce(this.windowResize, 200);
        },
        destroyed() {
            window.onresize = null;
        }
    };
</script>

<style lang="scss">
  body {
    margin: 0;

    .el-loading-spinner .el-loading-text {
      color: #eaeaea;
    }

    .el-loading-spinner i {
      color: #eaeaea;
      font-size: 45px;
    }
  }
</style>
