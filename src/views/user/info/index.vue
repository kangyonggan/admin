<template>
  <el-tabs
    v-model="activeTab"
    @tab-click="handleClick"
  >
    <el-tab-pane
      label="基础信息"
      name="0"
    >
      <base-info />
    </el-tab-pane>
    <el-tab-pane
      label="修改密码"
      name="1"
    >
      修改密码
    </el-tab-pane>
  </el-tabs>
</template>

<script>
    import BaseInfo from './base-info';

    export default {
        components: {BaseInfo},
        data() {
            return {
                activeTab: '0'
            };
        },
        methods: {
            handleClick(tab) {
                this.$router.push({
                    path: '/user/info',
                    query: {
                        tab: tab.name
                    }
                });
            }
        },
        mounted() {
            this.activeTab = '' + (this.$route.query.tab | '0');
        },
        beforeRouteUpdate(to, from, next) {
            this.activeTab = to.query.tab;
            next();
        }
    };
</script>
