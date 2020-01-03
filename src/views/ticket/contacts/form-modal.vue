<template>
  <base-modal
    ref="modal"
    title="添加联系人"
    :params="params"
    :rules="rules"
    url="/ticket/contacts"
    @success="handleSuccess"
  >
    <base-input
      label="用户ID"
      v-model="params.userId"
      prop="userId"
    />
    <base-input
      label="姓名"
      v-model="params.name"
      prop="name"
    />
    <base-input
      label="身份证号码"
      v-model="params.idNo"
      prop="idNo"
    />
    <base-input
      label="手机号"
      v-model="params.mobileNo"
      prop="mobileNo"
    />
  </base-modal>
</template>

<script>
    export default {
        data() {
            return {
                params: {},
                rules: {
                    userId: [
                        {required: true, message: '用户ID为必填项'}
                    ],
                    name: [
                        {required: true, message: '姓名为必填项'},
                        {max: 20, message: '姓名多20个字符'}
                    ],
                    idNo: [
                        {required: true, message: '身份证号码为必填项'},
                        {validator: this.validateContacts}
                    ],
                    mobileNo: [
                        {max: 20, message: '手机号多20个字符'}
                    ]
                }
            };
        },
        methods: {
            validateContacts: function (rule, value, callback) {
                if (!value || !this.params.userId) {
                    callback();
                    return;
                }

                this.axios.get('validate/contacts?idNo=' + value + '&userId=' + this.params.userId).then(() => {
                    callback();
                }).catch(res => {
                    callback(new Error(res.respMsg));
                });
            },
            show: function () {
                this.params = {};
                this.$refs.modal.show();
            },
            handleSuccess(data) {
                this.$emit('success', data);
            }
        }
    };
</script>