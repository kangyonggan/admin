<template>
  <base-modal
    ref="modal"
    :title="params.id ? '编辑字典' : '新增字典'"
    :params="params"
    :rules="rules"
    :method="params.id ? 'PUT' : 'POST'"
    url="/system/dict"
    @success="handleSuccess"
  >
    <base-select
      label="字典类型"
      v-model="params.type"
      prop="type"
      enum="DictType"
    />
    <base-input
      label="字典代码"
      v-model="params.code"
      prop="code"
    />
    <base-input
      label="字典的值"
      v-model="params.value"
      prop="name"
    />
    <base-input
      label="备注"
      v-model="params.remark"
      prop="name"
    />
  </base-modal>
</template>

<script>
    export default {
        data() {
            return {
                params: {},
                oldType: '',
                oldCode: '',
                rules: {
                    type: [
                        {required: true, message: '字典类型为必填项'}
                    ],
                    code: [
                        {required: true, message: '字典代码为必填项'},
                        {max: 64, message: '字典代码最多为64位'},
                        {validator: this.validateDictCode}
                    ],
                    value: [
                        {required: true, message: '字典的值为必填项'},
                        {max: 256, message: '字典的值最多为256位'}
                    ],
                    remark: [
                        {max: 256, message: '备注最多256位'}
                    ],
                    sort: [
                        {pattern: /^[0-9]*$/, message: '必须是自然数'},
                    ]
                }
            };
        },
        methods: {
            validateDictCode: function (rule, value, callback) {
                if (!value || !this.params.type || (this.oldCode === value && this.oldType === this.params.type)) {
                    callback();
                    return;
                }

                this.axios.get('/validate/dict?type=' + this.params.type + '&code=' + value).then(() => {
                    callback();
                }).catch(res => {
                    callback(new Error(res.respMsg));
                });
            },
            show: function (dict) {
                if (!dict) {
                    dict = {};
                }
                this.oldType = dict.type;
                this.oldCode = dict.code;
                dict.createdTime = undefined;
                dict.updatedTime = undefined;
                this.params = Object.assign({}, dict);
                this.$refs.modal.show();
            },
            handleSuccess(data) {
                this.$emit('success', data);
            }
        }
    };
</script>