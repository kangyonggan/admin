<template>
  <div>
    <!--搜索表单-->
    <base-search-form :model="params">
      <base-select
        label="来源"
        v-model="params.sourceId"
        prop="sourceId"
        :items="novelSources"
        code="id"
        name="baseUrl"
      />
      <base-input
        label="代码"
        v-model="params.code"
        prop="code"
      />
      <base-input
        label="书名"
        v-model="params.name"
        prop="name"
      />
      <base-input
        label="作者"
        v-model="params.author"
        prop="author"
      />
      <base-daterange
        label="创建日期"
        v-model="params.createdTime"
        prop="createdTime"
      />
      <template #actions>
        <el-button
          @click="$refs['form-modal'].show(novelSources)"
          type="success"
        >
          新增
        </el-button>
        <el-button
          @click="stopPull"
          type="danger"
        >
          停更
        </el-button>
      </template>
    </base-search-form>

    <!--表格-->
    <base-table
      url="sites/novel/manager"
      :columns="columns"
      ref="table"
    >
      <template #actions="{row}">
        <el-dropdown
          split-button
          trigger="click"
          size="small"
          @click="$refs['form-modal'].show(novelSources, row)"
          @command="handleCommand($event, row)"
        >
          编辑
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="0">
              <span>更新章节</span>
            </el-dropdown-item>
            <el-dropdown-item command="1">
              <span v-if="!row.isDeleted">逻辑删除</span>
              <span v-else>逻辑恢复</span>
            </el-dropdown-item>
            <el-dropdown-item command="2">
              <span>清空章节</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
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
                novelSources: [],
                columns: [
                    {
                        label: 'ID',
                        prop: 'id'
                    },
                    {
                        label: '书名',
                        prop: 'name'
                    },
                    {
                        label: '代码',
                        prop: 'code'
                    },
                    {
                        label: '作者',
                        prop: 'author'
                    },
                    {
                        label: '推荐指数',
                        prop: 'hold'
                    },
                    {
                        label: '来源',
                        prop: 'sourceId',
                        render: row => {
                            return this.getSource(row.sourceId);
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
                        render: row => {
                            return this.util.formatTimestamp(row.createdTime);
                        }
                    },
                    {
                        label: '更新时间',
                        prop: 'updatedTime',
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
                    this.$confirm('拉取' + row.name + '的最新章节，是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.axios.put('sites/novel/manager/' + row.id + '/pull').catch(res => {
                            this.warning(res.respMsg);
                        });
                    }).catch(() => {
                    });
                } else if (command === '1') {
                    const title = row.isDeleted ? '恢复已删除的小说：' : '逻辑删除小说：';
                    this.$confirm(title + row.name + '，是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.axios.put('sites/novel/manager/' + row.id + '/delete/' + !row.isDeleted * 1).then(() => {
                            this.$refs.table.request();
                        }).catch(res => {
                            this.error(res.respMsg);
                        });
                    }).catch(() => {
                    });
                } else if (command === '2') {
                    this.$confirm('清空' + row.name + '的全部章节，是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.axios.delete('sites/novel/manager/' + row.id + '/section').catch(res => {
                            this.error(res.respMsg);
                        });
                    }).catch(() => {
                    });
                }
            },
            stopPull: function () {
                this.$confirm('停止小说全部更新，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axios.put('sites/novel/manager/stopPull').catch(res => {
                        this.error(res.respMsg);
                    });
                }).catch(() => {
                });
            },
            getSource(sourceId) {
                for (let i = 0; i < this.novelSources.length; i++) {
                    if (this.novelSources[i].id === sourceId) {
                        return this.novelSources[i].baseUrl;
                    }
                }

                return sourceId;
            }
        },
        mounted() {
            this.axios.get('sites/novel/source/all').then(data => {
                this.novelSources = data.novelSources;
            }).catch(res => {
                this.error(res.respMsg);
            });
        }
    };
</script>


