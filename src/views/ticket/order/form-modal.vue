<template>
  <base-modal
    ref="modal"
    :title="'修改订单-' + params.orderNo"
    :params="params"
    :rules="rules"
    method="PUT"
    url="/ticket/order"
    @success="handleSuccess"
  >
    <base-input
      label="乘客姓名"
      v-model="params.name"
      prop="name"
      readonly
    />
    <base-input
      label="出发日期"
      v-model="params.trainDates"
      prop="trainDates"
    />
    <base-input
      label="车次"
      v-model="params.trainCodes"
      prop="trainCodes"
    />
    <base-input
      label="坐席"
      v-model="params.trainSeats"
      prop="trainSeats"
    />
    <base-input
      label="权重"
      v-model="params.weight"
      prop="weight"
    />
    <base-input
      label="金额"
      v-model="params.amount"
      prop="amount"
    />
  </base-modal>
</template>

<script>
    export default {
        data() {
            return {
                params: {},
                rules: {
                    trainDates: [
                        {required: true, message: '出发日期为必填项'}
                    ],
                    trainCodes: [
                        {required: true, message: '车次为必填项'}
                    ],
                    trainSeats: [
                        {required: true, message: '坐席为必填项'}
                    ],
                    weight: [
                        {pattern: /^[0-9]*$/, message: '权重必须是自然数'},
                    ],
                    amount: [
                        {pattern: /^[0-9]*$/, message: '金额必须是自然数'},
                    ]
                }
            };
        },
        methods: {
            show: function (item) {
                if (!item) {
                    item = {};
                }
                this.params = Object.assign({}, item);
                this.params.createdTime = undefined;
                this.params.updatedTime = undefined;
                this.params.status = undefined;
                this.params.qryCnt = undefined;
                this.params.lastQryTime = undefined;
                this.params.lockSt = undefined;
                this.$refs.modal.show();
            },
            handleSuccess(data) {
                this.$emit('success', data);
            }
        }
    };
</script>