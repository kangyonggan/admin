<template>
  <div>
    <el-card v-loading="loginConfLoading">
      <div slot="header">
        <span>登录状态</span>
        <div class="actions">
          <el-button
            type="warning"
            size="medium"
            @click="refreshLoginConf"
          >
            刷新
          </el-button>
        </div>
      </div>
      <div>
        当前登录状态：{{ loginConf }}
      </div>
    </el-card>

    <el-card
      v-loading="crabLoading"
      style="margin-top: 20px;"
    >
      <div slot="header">
        <span>无敌抢票</span>
        <div class="actions">
          <el-button
            type="success"
            size="medium"
            @click="start"
          >
            启动
          </el-button>
          <el-button
            type="danger"
            size="medium"
            @click="stop"
          >
            停止
          </el-button>
          <el-button
            type="warning"
            size="medium"
            @click="refresh"
          >
            刷新
          </el-button>
        </div>
      </div>
      <div>
        当前状态：{{ isStop ? '已停止' : '已启动' }}
      </div>
      <div>
        当前车票订单：{{ order }}
      </div>
    </el-card>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                crabLoading: false,
                loginConfLoading: false,
                order: {},
                isStop: true,
                loginConf: {}
            };
        },
        methods: {
            start() {
                this.$confirm('将启动无敌抢票，是否已登录12306?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.crabLoading = true;
                    this.axios.put('ticket/crab/start').then(() => {
                        this.success('无敌抢票启动成功');
                        this.refresh();
                    }).catch(res => {
                        this.error(res.respMsg);
                    }).finally(() => {
                        this.crabLoading = false;
                    });
                });
            },
            stop() {
                this.$confirm('将停止无敌抢票，想好了吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.crabLoading = true;
                    this.axios.put('ticket/crab/stop').then(() => {
                        this.success('无敌抢票已停止');
                    }).catch(res => {
                        this.error(res.respMsg);
                    }).finally(() => {
                        this.crabLoading = false;
                    });
                });
            },
            refresh() {
                this.crabLoading = true;
                this.axios.get('ticket/crab/refresh').then(data => {
                    this.order = data.order;
                    this.isStop = data.isStop;
                }).catch(res => {
                    this.error(res.respMsg);
                }).finally(() => {
                    this.crabLoading = false;
                });
            },
            refreshLoginConf() {
                this.loginConfLoading = true;
                this.axios.get('ticket/crab/refreshLoginConf').then(data => {
                    this.loginConf = data.loginConf;
                }).catch(res => {
                    this.error(res.respMsg);
                }).finally(() => {
                    this.loginConfLoading = false;
                });
            }
        },
        mounted() {
            this.refresh();
            this.refreshLoginConf();
        }
    };
</script>

<style scoped lang="scss">
  .el-card {
    position: relative;
  }

  .actions {
    position: absolute;
    right: 20px;
    top: 10px;
  }
</style>