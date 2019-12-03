<template>
  <el-dialog
    class="base-dialog"
    title="查看授权用户"
    :visible.sync="dialogVisible"
    width="600px"
  >
    <base-table
      :url="'system/role/' + id + '/user'"
      :columns="columns"
      :actions="false"
      ref="table"
      lazy
    />
  </el-dialog>
</template>

<script>
    export default {
        data() {
          return {
              dialogVisible: false,
              id: '',
              columns: [
                  {
                      label: '用户ID',
                      prop: 'id'
                  },
                  {
                      label: '账号',
                      prop: 'account'
                  },
                  {
                      label: '姓名',
                      prop: 'name'
                  }
              ]
          };
        },
        methods: {
            show: function (id) {
                this.id = id;
                this.dialogVisible = true;
                this.$nextTick(function () {
                    this.$refs.table.request();
                });
            }
        }
    };
</script>