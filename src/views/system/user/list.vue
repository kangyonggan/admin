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
        prop="account"
        label="账号"
        sortable
      />
      <el-table-column
        prop="name"
        label="姓名"
        sortable
      />
      <el-table-column
        prop="isDeleted"
        label="状态"
        sortable
      >
        <template slot-scope="scope">
          {{ util.formatStatus(scope.row.isDeleted) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="createdTime"
        label="创建日期"
        sortable
      >
        <template slot-scope="scope">
          {{ util.formatTimestamp(scope.row.createdTime) }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
      >
        <template>
          <el-dropdown
            split-button
            trigger="click"
            size="small"
          >
            编辑
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>逻辑删除</el-dropdown-item>
              <el-dropdown-item>修改密码</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
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


