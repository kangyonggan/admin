<template>
  <div>
    <el-card v-loading="loginConfLoading">
      <div slot="header">
        <span>登录状态</span>
        <div class="actions">
          <el-button
            type="success"
            size="medium"
            @click="login"
          >
            登录
          </el-button>
          <el-button
            type="primary"
            size="medium"
            @click="reLogin"
          >
            重连
          </el-button>
          <el-button
            type="danger"
            size="medium"
            @click="logout"
          >
            退出
          </el-button>
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
        当前登录状态：
        <span
          v-if="loginConf && loginConf.is_login === 'Y'"
          style="color: green"
        >
          已登录
        </span>
        <span style="color: red">
          未登录
        </span>
      </div>

      <div
        v-if="qrPath"
        style="margin-top: 10px;text-align: center;"
      >
        <img :src="axios.defaults.baseURL + qrPath">

        <div style="margin-top: 30px">
          二维码状态：
          <span v-if="status === '0'">
            待扫码
          </span>
          <span v-else-if="status === '1'">
            已扫码，待确认
          </span>
          <span v-else-if="status === '2'">
            已登录
          </span>
          <span v-else>
            {{ status }}
          </span>
        </div>
      </div>
      <div
        style="margin-top: 10px;"
        v-show="loginConf"
      >
        登录配置：
        <div class="code">
          {{ loginConf }}
        </div>
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
      <div
        style="margin-top: 10px;"
        v-show="order"
      >
        当前车票订单：
        <div class="code">
          {{ order }}
        </div>
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
                order: undefined,
                isStop: true,
                loginConf: undefined,
                timer: undefined,
                qrPath: '',
                status: ''
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
                    this.stopCrab();
                });
            },
            stopCrab() {
                this.crabLoading = true;
                this.axios.put('ticket/crab/stop').then(() => {
                    this.success('无敌抢票已停止');
                    this.refresh();
                }).catch(res => {
                    this.error(res.respMsg);
                }).finally(() => {
                    this.crabLoading = false;
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
            },
            logout() {
                this.$confirm('确定退出12306账号，想好了吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.loginConfLoading = true;
                    this.axios.get('ticket/crab/logout').then(() => {
                        this.success('成功退出12306');
                        this.stopCrab();
                        this.refreshLoginConf();
                    }).catch(res => {
                        this.error(res.respMsg);
                    }).finally(() => {
                        this.loginConfLoading = false;
                    });
                });
            },
            reLogin() {
                this.$confirm('确定重新连接12306账号，想好了吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.loginConfLoading = true;
                    this.axios.get('ticket/crab/reLogin').then(data => {
                        this.loginConf = data.loginConf;
                    }).catch(res => {
                        this.error(res.respMsg);
                    }).finally(() => {
                        this.loginConfLoading = false;
                    });
                });
            },
            login() {
                this.$confirm('确定登录12306账号，想好了吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.loginConfLoading = true;
                    this.axios.get('ticket/crab/login').then(data => {
                        this.qrPath = data.qrPath;

                        let that = this;
                        this.timer = setInterval(function () {
                            that.checkQr();
                        }, 1500);
                    }).catch(res => {
                        this.error(res.respMsg);
                    }).finally(() => {
                        this.loginConfLoading = false;
                    });
                });
            },
            checkQr() {
                this.axios.get('ticket/crab/checkQr').then(data => {
                    this.status = data.status;

                    if (this.status === '2') {
                        clearInterval(this.timer);
                        this.qrPath = '';
                        this.refreshLoginConf();
                    }
                }).catch(res => {
                    this.error(res.respMsg);
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

  .code {
    margin-top: 8px;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    padding: 8px 10px;
    background: #f5f5f5;
  }
</style>