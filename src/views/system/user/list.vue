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
      <template #actions>
        <el-button
          type="success"
          @click="$refs['create-model'].show()"
        >
          新增
        </el-button>
      </template>
    </base-search-form>

    <!--表格-->
    <base-table
      url="/system/user"
      :columns="columns"
      ref="table"
    >
      <template #actions="{row}">
        <el-dropdown
          split-button
          trigger="click"
          size="small"
          @click="$refs['edit-model'].show(row)"
        >
          编辑
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>逻辑删除</el-dropdown-item>
            <el-dropdown-item>修改密码</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </base-table>

    <!--新增界面-->
    <create-model
      ref="create-model"
      @success="$refs.table.reload(params)"
    />

    <!--编辑界面-->
    <edit-model
      ref="edit-model"
      @success="$refs.table.reload(params)"
    />
  </div>
</template>

<script>
    import CreateModel from './create-modal';
    import EditModel from './edit-modal';

    export default {
        components: {CreateModel, EditModel},
        data() {
            return {
                params: {},
                columns: [
                    {
                        label: 'ID',
                        prop: 'id'
                    },
                    {
                        label: '账号',
                        prop: 'account'
                    },
                    {
                        label: '姓名',
                        prop: 'name'
                    },
                    {
                        label: '状态',
                        prop: 'isDeleted',
                        render: row => {
                            return this.util.formatStatus(row.isDeleted);
                        }
                    },
                    {
                        label: '创建日期',
                        prop: 'createdTime',
                        render: row => {
                            return this.util.formatTimestamp(row.createdTime);
                        }
                    }
                ]
            };
        }
    };
</script>


