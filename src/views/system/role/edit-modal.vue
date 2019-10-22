<template>
  <base-modal
    ref="modal"
    title="编辑角色"
    :params="params"
    :rules="rules"
    url="/system/role"
    method="put"
    @success="handleSuccess"
  >
    <base-input
      label="ID"
      v-model="params.id"
      prop="id"
      readonly
    />
    <base-input
      label="角色代码"
      v-model="params.code"
      prop="code"
    />
    <base-input
      label="角色名称"
      v-model="params.name"
      prop="name"
    />
  </base-modal>
</template>

<script>
    export default {
        data() {
            return {
                params: {},
                oldCode: '',
                rules: {
                    code: [
                        {required: true, message: '角色代码为必填项'},
                        {pattern: /^ROLE[A-Z_]{0,16}$/, message: '以ROLE开头,纯大写,可带下划线,不超过20位'},
                        {validator: this.validateRoleCode}
                    ],
                    name: [
                        {required: true, message: '角色名称为必填项'},
                        {max: 20, message: '角色名称最多为20位'},
                    ]
                }
            };
        },
        methods: {
            validateRoleCode: function (rule, value, callback) {
                if (!value || value === this.oldCode) {
                    callback();
                    return;
                }

                this.axios.get('/validate/role?code=' + value).then(() => {
                    callback();
                }).catch(res => {
                    callback(new Error(res.respMsg));
                });
            },
            show: function (row) {
                this.oldCode = row.code;
                this.params = {
                    id: row.id,
                    code: row.code,
                    name: row.name
                };
                this.$refs.modal.show();
            },
            handleSuccess(data) {
                this.$emit('success', data);
            }
        }
    };
</script>