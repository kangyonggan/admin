<template>
  <base-modal
    ref="modal"
    title="标记用户"
    :params="params"
    :url="'/system/user/' + params.id + '/role'"
    method="put"
  >
    <el-transfer
      v-loading="loading"
      v-model="params.roleIds"
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
                this.axios.get('/system/user/' + id + '/role').then(data => {
                    this.params = {
                        id: id,
                        roleIds: data.roleIds
                    };
                    this.allRoles = data.allRoles;
                }).catch(data => {
                   this.error(data.respMsg);
                }).finally(() => {
                    this.loading = false;
                });
            }
        }
    };
</script>