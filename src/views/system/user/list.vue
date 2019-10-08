<template>
  <div>
    <!--搜索表单-->
    <base-search-form :model="params">
      <base-input
        label="账号"
        v-model="params.account"
        prop="account"
      />
      <base-daterange
        label="创建日期"
        v-model="params.createdTime"
        prop="createdTime"
      />
      <template slot="actions">
        <el-button
          type="success"
        >
          新增
        </el-button>
      </template>
    </base-search-form>

    <!--表格-->
    <base-table
      url="/admin/system/user"
      ref="table"
    >
      <el-table-column
        prop="id"
        label="ID"
        sortable
      />
      <el-table-column
        prop="name"
        label="姓名"
        sortable
      />
      <el-table-column
        prop="date"
        label="日期"
        sortable
      />
    </base-table>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                params: {}
            };
        }
    };
</script>


