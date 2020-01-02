<template>
  <div>
    <!--搜索表单-->
    <base-search-form :model="params">
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
      <base-input
        label="出发地"
        v-model="params.fromStationName"
        prop="fromStationName"
      />
      <base-input
        label="目的地"
        v-model="params.toStationName"
        prop="toStationName"
      />
      <base-select
        label="订单状态"
        v-model="params.status"
        prop="type"
        :items="orderStatusList"
      />
    </base-search-form>

    <!--表格-->
    <base-table
      url="user/order"
      :columns="columns"
      ref="table"
    >
      <template #actions="{row}">
        <el-dropdown
          split-button
          trigger="click"
          size="small"
        >
          修改
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="0">
              撤回
            </el-dropdown-item>
            <el-dropdown-item command="1">
              删除
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </base-table>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                params: {},
                orderStatusList: [],
                columns: [
                    {
                        label: '订单号',
                        prop: 'orderNo'
                    },
                    {
                        label: '乘客姓名',
                        prop: 'name'
                    },
                    {
                        label: '出发地',
                        prop: 'fromStationName'
                    },
                    {
                        label: '目的地',
                        prop: 'toStationName'
                    },
                    {
                        label: '金额',
                        prop: 'amount'
                    },
                    {
                        label: '查询次数',
                        prop: 'qryCnt'
                    },
                    {
                        label: '订单状态',
                        prop: 'status',
                        render: row => {
                            return this.formatStatus(row.status);
                        }
                    },
                    {
                        label: '下单时间',
                        prop: 'createdTime',
                        render: row => {
                            return this.util.formatTimestamp(row.createdTime);
                        }
                    }
                ]
            };
        },
        methods: {
            formatStatus(status) {
                for (let i = 0; i < this.orderStatusList.length; i++) {
                    let item = this.orderStatusList[i];
                    if (item.code === status) {
                        return item.name;
                    }
                }

                return status;
            }
        },
        mounted() {
            this.axios.get('enum?enumKey=OrderStatus').then(data => {
                this.orderStatusList = data.enums;
            }).catch(res => {
                this.error(res.respMsg);
            });
        }
    };
</script>


