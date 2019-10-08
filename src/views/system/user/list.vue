<template>
  <div>
    <el-form
      :inline="true"
      :model="params"
      ref="form"
    >
      <el-row>
        <el-form-item
          label="账号"
          prop="account"
        >
          <el-input
            v-model="params.account"
            clearable
          />
        </el-form-item>
        <el-form-item
          label="创建日期"
          prop="createdTime"
        >
          <el-date-picker
            type="daterange"
            v-model="params.createdTime"
          />
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item>
          <el-button
            type="primary"
            @click="$refs.table.reload(params)"
          >
            查询
          </el-button>
          <el-button
            type="warning"
            @click="$refs.form.resetFields()"
          >
            清空
          </el-button>
        </el-form-item>
      </el-row>
    </el-form>

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


