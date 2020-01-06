<template>
  <div>
    <!--搜索表单-->
    <base-search-form :model="params">
      <base-input
        label="用户ID"
        v-model="params.userId"
        prop="userId"
      />
      <base-input
        label="订单号"
        v-model="params.orderNo"
        prop="orderNo"
      />
      <base-input
        label="乘客姓名"
        v-model="params.name"
        prop="name"
      />
      <el-form-item
        label="出发地"
        prop="fromStationName"
      >
        <el-select
          v-model="params.fromStationName"
          placeholder="简拼/全拼/汉字"
          filterable
          remote
          :remote-method="searchFromStations"
        >
          <el-option
            v-for="item in fromStations"
            :key="item.id"
            :label="item.stationName"
            :value="item.stationName"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="目的地"
        prop="toStationName"
      >
        <el-select
          v-model="params.toStationName"
          placeholder="简拼/全拼/汉字"
          filterable
          remote
          :remote-method="searchToStations"
        >
          <el-option
            v-for="item in toStations"
            :key="item.id"
            :label="item.stationName"
            :value="item.stationName"
          />
        </el-select>
      </el-form-item>
      <base-select
        label="订单状态"
        v-model="params.status"
        prop="type"
        :items="orderStatusList"
      />
      <base-daterange
        label="下单日期"
        v-model="params.createdTime"
        prop="createdTime"
      />
    </base-search-form>

    <!--表格-->
    <base-table
      url="ticket/order"
      :columns="columns"
      ref="table"
      :fixed-action="true"
    >
      <template #actions="{row}">
        <el-dropdown
          split-button
          trigger="click"
          size="small"
          @click="$refs['form-modal'].show(row)"
          @command="handleCommand($event, row)"
        >
          修改
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="GRABBING">
              审核通过
            </el-dropdown-item>
            <el-dropdown-item command="CANCEL">
              取消抢票
            </el-dropdown-item>
            <el-dropdown-item command="SUCCESS">
              完成
            </el-dropdown-item>
            <el-dropdown-item command="REFUND">
              退票
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </base-table>

    <el-row style="margin-top: 30px; color: #595959; font-size: 14px;">
      提示：{{ seatMap }}
    </el-row>

    <!--新增界面-->
    <form-modal
      ref="form-modal"
      @success="$refs.table.reload(params)"
    />
  </div>
</template>

<script>
    import FormModal from './form-modal';

    export default {
        components: {FormModal},
        data() {
            return {
                params: {},
                seatMap: {},
                orderStatusList: [],
                fromStations: [],
                toStations: [],
                columns: [
                    {
                        label: '订单号',
                        prop: 'orderNo',
                        width: '180',
                        fixed: 'left'
                    },
                    {
                        label: '乘客姓名',
                        prop: 'name',
                        width: '110',
                        fixed: 'left'
                    },
                    {
                        label: '乘客状态',
                        prop: 'contStatus',
                        width: '110',
                        render: row => {
                            return this.formatContStatus(row.contStatus);
                        }
                    },
                    {
                        label: '订单状态',
                        prop: 'status',
                        width: '120',
                        render: row => {
                            return this.formatStatus(row.status);
                        }
                    },
                    {
                        label: '出发地',
                        prop: 'fromStationName',
                        width: '110'
                    },
                    {
                        label: '目的地',
                        prop: 'toStationName',
                        width: '110'
                    },
                    {
                        label: '出发日期',
                        prop: 'trainDates',
                        width: '270'
                    },
                    {
                        label: '抢票席座',
                        prop: 'trainSeats',
                        width: '180',
                        render: row => {
                            return this.formatSeat(row.trainSeats);
                        }
                    },
                    {
                        label: '抢票次数',
                        prop: 'qryCnt',
                        width: '110'
                    },
                    {
                        label: '抢票车次',
                        prop: 'trainCodes',
                        width: '350'
                    },
                    {
                        label: '最后抢票时间',
                        prop: 'lastQryTime',
                        width: '180',
                        render: row => {
                            return this.util.formatTimestamp(row.createdTime);
                        }
                    },
                    {
                        label: '权重',
                        prop: 'weight',
                        width: '110'
                    },
                    {
                        label: '用户ID',
                        prop: 'userId',
                        width: '110'
                    },
                    {
                        label: '金额（元）',
                        prop: 'amount',
                        width: '120'
                    },
                    {
                        label: '下单时间',
                        prop: 'createdTime',
                        width: '180',
                        render: row => {
                            return this.util.formatTimestamp(row.createdTime);
                        }
                    }
                ]
            };
        },
        methods: {
            handleCommand: function (command, row) {
                this.$confirm('本次操作订单号为：' + row.orderNo + '，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axios.put('ticket/order/' + row.id + '/status/' + command).then(() => {
                        this.$refs.table.request();
                    }).catch(res => {
                        this.error(res.respMsg);
                    });
                });
            },
            formatStatus(status) {
                for (let i = 0; i < this.orderStatusList.length; i++) {
                    let item = this.orderStatusList[i];
                    if (item.code === status) {
                        return item.name;
                    }
                }

                return status;
            },
            formatContStatus(contStatus) {
                if (contStatus === '') {
                    return '审核中';
                }
                if (contStatus === '99') {
                    return '审核通过';
                }
                return '审核失败';
            },
            searchFromStations(key) {
                this.axios.get('ticket/stations?key=' + key).then(data => {
                    this.fromStations = data.stations;
                }).catch(res => {
                    this.error(res.respMsg);
                });
            },
            searchToStations(key) {
                this.axios.get('ticket/stations?key=' + key).then(data => {
                    this.toStations = data.stations;
                }).catch(res => {
                    this.error(res.respMsg);
                });
            },
            formatSeat(trainSeats) {
                let arr = trainSeats.split(',');
                let res = '';
                for (let i = 0; i < arr.length; i++) {
                    if (i !== 0) {
                        res += ',';
                    }
                    res += this.seatMap[arr[i]];
                }
                return res;
            }
        },
        mounted() {
            this.axios.get('enum?enumKey=OrderStatus').then(data => {
                this.orderStatusList = data.enums;
            }).catch(res => {
                this.error(res.respMsg);
            });
            this.axios.get('enum?enumKey=SeatType').then(data => {
                let enums = data.enums;
                for (let i = 0; i < enums.length; i++) {
                    this.seatMap[enums[i].code] = enums[i].name;
                }
                this.$forceUpdate();
            }).catch(res => {
                this.error(res.respMsg);
            });
        }
    };
</script>

