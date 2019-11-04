<template>
  <base-modal
    ref="modal"
    title="设置角色"
    :params="params"
    :url="'/system/user/' + params.id + '/role'"
    method="put"
  >
    <el-transfer
      v-loading="loading"
      v-model="params.userRoleIds"
      :titles="['未拥有角色', '已拥有角色']"
      :props="{
        key: 'id',
        label: 'name'
      }"
      :data="allRoles"
    />
  </base-modal>
</template>

<script>
    export default {
        data() {
            return {
                loading: false,
                params: {},
                allRoles: []
            };
        },
        methods: {
            show: function (id) {
                this.params = {};
                this.allRoles = [];
                this.$refs.modal.show();

                this.loading = true;
                this.axios.get('system/user/' + id + '/role').then(data => {
                    this.params = {
                        id: id,
                        userRoleIds: data.userRoleIds
                    };
                    this.allRoles = data.allRoles;
                }).catch(res => {
                   this.error(res.respMsg);
                }).finally(() => {
                    this.loading = false;
                });
            }
        }
    };
</script>