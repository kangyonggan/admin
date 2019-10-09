<template>
  <div>
    <navbar/>
    <el-container>
      <sidebar/>
      <el-main>
        <router-view/>
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
  }
</style>
