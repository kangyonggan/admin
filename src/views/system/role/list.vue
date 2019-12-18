<template>
  <div>
    <!--搜索表单-->
    <base-search-form :model="params">
      <base-input
        label="角色代码"
        v-model="params.code"
        prop="code"
      />
      <base-input
        label="角色名称"
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
      url="system/role"
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
              查询授权用户
            </el-dropdown-item>
            <el-dropdown-item command="1">
              设置菜单
            </el-dropdown-item>
            <el-dropdown-item command="2">
              <span v-if="!row.isDeleted">逻辑删除</span>
              <span v-else>逻辑恢复</span>
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

    <!--设置菜单界面-->
    <menu-modal ref="menu-modal" />

    <!--授权用户界面-->
    <user-modal ref="user-modal" />
  </div>
</template>

<script>
    import CreateModal from './create-modal';
    import EditModal from './edit-modal';
    import MenuModal from './menu-modal';
    import UserModal from './user-modal';

    export default {
        components: {CreateModal, EditModal, MenuModal, UserModal},
        data() {
            return {
                params: {},
                columns: [
                    {
                        label: 'ID',
                        prop: 'id'
                    },
                    {
                        label: '角色代码',
                        prop: 'code'
                    },
                    {
                        label: '角色名称',
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
                        label: '创建时间',
                        prop: 'createdTime',
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
                    this.$refs['user-modal'].show(row.id);
                } else if (command === '1') {
                    this.$refs['menu-modal'].show(row.id);
                } else if (command === '2') {
                    const title = row.isDeleted ? '恢复已删除的角色：' : '逻辑删除角色：';
                    this.$confirm(title + row.name + '，是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.axios.put('system/role/' + row.id + '/delete/' + !row.isDeleted * 1).then(() => {
                            this.$refs.table.request();
                        }).catch(res => {
                            this.error(res.respMsg);
                        });
                    });
                }
            }
        }
    };
</script>


