<template>
  <el-tree
    :data="menus"
    node-key="id"
    :props="{label: 'title'}"
    default-expand-all
  />
</template>

<script>
    export default {
        data() {
            return {
                params: {},
                menus: []
            };
        },
        methods: {
            renderContent(h, { node, data, store }) {
                // return h();
            }
        },
        mounted() {
            this.axios.get('/system/menu').then(data => {
                this.menus = data.menus;
            }).catch(res => {
                this.error(res.respMsg);
            });
        }
    };
</script>

<style scoped lang="scss">
  .el-tree {
    width: 50%;
    max-width: 800px;
    min-width: 400px;
    margin: 0 auto;
  }
</style>


