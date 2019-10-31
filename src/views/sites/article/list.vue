<template>
  <div>
    <!--搜索表单-->
    <base-search-form :model="params">
      <base-input
        label="标题"
        v-model="params.title"
        prop="title"
      />
      <base-daterange
        label="创建日期"
        v-model="params.createdTime"
        prop="createdTime"
      />
      <template #actions>
        <el-button
          @click="$router.push({path: '/sites/article/create'})"
          type="success"
        >
          新增
        </el-button>
      </template>
    </base-search-form>

    <!--表格-->
    <base-table
      url="/sites/article"
      :columns="columns"
      ref="table"
    >
      <template #actions="{row}">
        <el-dropdown
          split-button
          trigger="click"
          size="small"
          @click="$router.push({path: '/sites/article/' + row.id + '/edit/'})"
          @command="handleCommand($event, row)"
        >
          编辑
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="0">
              <span v-if="!row.isDeleted">逻辑删除</span>
              <span v-else>逻辑恢复</span>
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
                        label: 'ID',
                        prop: 'id'
                    },
                    {
                        label: '标题',
                        prop: 'title',
                        width: '700'
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
                    },
                    {
                        label: '更新时间',
                        prop: 'updatedTime',
                        width: '180',
                        render: row => {
                            return this.util.formatTimestamp(row.updatedTime);
                        }
                    }
                ]
            };
        },
        methods: {
            handleCommand: function (command, row) {
                if (command === '0') {
                    const title = row.isDeleted ? '恢复已删除的文章：' : '逻辑删除文章：';
                    this.$confirm(title + row.title + '，是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.axios.put('/sites/article/' + row.id + '/delete/' + !row.isDeleted * 1).then(() => {
                            this.$refs.table.request();
                        }).catch(res => {
                            this.error(res.respMsg);
                        });
                    }).catch(() => {
                    });
                }
            }
        }
    };
</script>


