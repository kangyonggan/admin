<template>
  <base-modal
    ref="modal"
    title="设置菜单"
    :params="params"
    :url="'/system/role/' + params.id + '/menu'"
    method="put"
  >
    <el-tree
      ref="tree"
      :data="allMenus"
      node-key="id"
      :props="{label: 'title'}"
      show-checkbox
      default-expand-all
      :check-strictly="strictly"
      check-on-click-node
      @check-change="change"
      :default-checked-keys="roleMenus">
    </el-tree>
  </base-modal>
</template>

<script>
    export default {
        data() {
            return {
                loading: false,
                params: {},
                strictly: true,
                roleMenus: [],
                allMenus: []
            };
        },
        methods: {
            show: function (id) {
                this.strictly = true;
                this.params = {};
                this.allMenus = [];
                this.$refs.modal.show();

                this.loading = true;
                this.axios.get('/system/role/' + id + '/menu').then(data => {
                    this.params = {
                        id: id
                    };
                    this.params.menuIds = data.roleMenus;
                    this.roleMenus = data.roleMenus;
                    this.allMenus = data.allMenus;
                    this.strictly = false;
                }).catch(res => {
                    this.error(res.respMsg);
                }).finally(() => {
                    this.loading = false;
                });
            },
            change: function () {
                this.params.menuIds = this.$refs.tree.getCheckedNodes(false, true).map(node => node.id);
            }
        }
    };
</script>