<template>
  <div>
    <!--搜索表单-->
    <base-search-form :model="params">
      <base-input
        label="账号"
        v-model="params.account"
        prop="account"
      />
      <base-input
        label="OpenId"
        v-model="params.openId"
        prop="openId"
      />
      <base-input
        label="姓名"
        v-model="params.name"
        prop="name"
      />
      <base-daterange
        label="创建日期"
        v-model="params.createdTime"
        prop="createdTime"
      />
      <template #actions>
        <el-button
          type="success"
          @click="$refs['create-modal'].show()"
        >
          新增
        </el-button>
      </template>
    </base-search-form>

    <!--表格-->
    <base-table
      url="system/user"
      :columns="columns"
      ref="table"
    >
      <template #actions="{row}">
        <el-dropdown
          split-button
          trigger="click"
          size="small"
          @click="$refs['edit-modal'].show(row)"
          @command="handleCommand($event, row)"
        >
          编辑
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="0">
              设置角色
            </el-dropdown-item>
            <el-dropdown-item command="1">
              <span v-if="!row.isDeleted">逻辑删除</span>
              <span v-else>逻辑恢复</span>
            </el-dropdown-item>
            <el-dropdown-item command="2">
              修改密码
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </base-table>

    <!--新增界面-->
    <create-modal
      ref="create-modal"
      @success="$refs.table.reload(params)"
    />

    <!--编辑界面-->
    <edit-modal
      ref="edit-modal"
      @success="$refs.table.request()"
    />

    <!--设置角色界面-->
    <role-modal ref="role-modal" />

    <!--修改密码界面-->
    <password-modal ref="password-modal" />
  </div>
</template>

<script>
    import CreateModal from './create-modal';
    import EditModal from './edit-modal';
    import RoleModal from './role-modal';
    import PasswordModal from './password-modal';

    export default {
        components: {CreateModal, EditModal, RoleModal, PasswordModal},
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
                        label: 'OpenId',
                        prop: 'openId',
                        width: '300'
                    },
                    {
                        label: '姓名',
                        prop: 'name'
                    },
                    {
                        label: '补全信息',
                        prop: 'isFinished',
                        render: row => {
                            return row.isFinished ? '已补全' : '未补全';
                        }
                    },
                    {
                        label: '状态',
                        prop: 'isDeleted',
                        render: row => {
                            return this.util.formatStatus(row.isDeleted);
                        }
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
            handleCommand: function (command, row) {
                if (command === '0') {
                    this.$refs['role-modal'].show(row.id);
                } else if (command === '1') {
                    const title = row.isDeleted ? '恢复已删除的用户：' : '逻辑删除用户：';
                    this.$confirm(title + row.account + '，是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.axios.put('system/user/' + row.id + '/delete/' + !row.isDeleted * 1).then(() => {
                            this.$refs.table.request();
                        }).catch(res => {
                           this.error(res.respMsg);
                        });
                    }).catch(() => {
                    });
                } else if (command === '2') {
                    this.$refs['password-modal'].show(row);
                }
            }
        }
    };
</script>


