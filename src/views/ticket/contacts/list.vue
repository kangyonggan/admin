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
        label="姓名"
        placeholder="支持模糊搜索"
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
      <base-input
        label="状态"
        v-model="params.status"
        prop="status"
      />
      <base-daterange
        label="创建日期"
        v-model="params.createdTime"
        prop="createdTime"
      />
      <template #actions>
        <el-button
          type="success"
          @click="$refs['form-modal'].show()"
        >
          新增
        </el-button>
      </template>
    </base-search-form>

    <!--表格-->
    <base-table
      url="ticket/contacts"
      :columns="columns"
      ref="table"
    >
      <template #actions="{row}">
        <i
          style="font-size: 24px;color: red;cursor: pointer"
          class="el-icon-remove"
          @click="deleteContacts(row)"
        />
      </template>
    </base-table>

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
                columns: [
                    {
                        label: 'ID',
                        prop: 'id'
                    },
                    {
                        label: '用户ID',
                        prop: 'userId'
                    },
                    {
                        label: '姓名',
                        prop: 'name'
                    },
                    {
                        label: '身份证号码',
                        prop: 'idNo'
                    },
                    {
                        label: '手机号',
                        prop: 'mobileNo'
                    },
                    {
                        label: '状态',
                        prop: 'status'
                    },
                    {
                        label: '创建时间',
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
            deleteContacts: function (row) {
                this.$confirm('删除联系人' + row.name + '，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axios.delete('ticket/contacts/' + row.id).then(() => {
                        this.$refs.table.request();
                    }).catch(res => {
                        this.error(res.respMsg);
                    });
                });
            }
        }
    };
</script>


