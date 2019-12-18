<template>
  <div>
    <el-row>
      <el-button
        round
        plain
        @click="$router.push({path: '/dev/oauth2App/create'})"
      >
        <i class="el-icon-plus" />
        创建应用
      </el-button>
    </el-row>

    <!--表格-->
    <base-table
      url="dev/oauth2App"
      :columns="columns"
      ref="table"
      :pagination="false"
    >
      <template #actions="{row}">
        <el-dropdown
          split-button
          trigger="click"
          size="small"
          @click="$router.push({path: '/dev/oauth2App/' + row.id + '/edit/'})"
          @command="handleCommand($event, row)"
        >
          编辑
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="0">
              <span>删除</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </base-table>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                params: {},
                columns: [
                    {
                        label: 'APP_ID',
                        prop: 'clientId',
                        sortable: false
                    },
                    {
                        label: '应用名称',
                        prop: 'name',
                        sortable: false
                    },
                    {
                        label: '审核状态',
                        prop: 'status',
                        render: row => {
                            return row.status === 'Y' ? '审核通过' : row.status === 'F' ? '审核失败' : '审核中';
                        },
                        sortable: false
                    },
                    {
                        label: '创建时间',
                        prop: 'createdTime',
                        width: '180',
                        render: row => {
                            return this.util.formatTimestamp(row.createdTime);
                        },
                        sortable: false
                    }
                ]
            };
        },
        methods: {
            handleCommand: function (command, row) {
                if (command === '0') {
                    const title = '删除《' + row.name + '》';
                    this.$confirm(title + '，是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.axios.delete('dev/oauth2App/' + row.id).then(() => {
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


