<template>
  <div>
    <!--搜索表单-->
    <base-search-form :model="params">
      <base-input
        label="基础地址"
        v-model="params.baseUrl"
        prop="baseUrl"
      />
      <base-daterange
        label="创建日期"
        v-model="params.createdTime"
        prop="createdTime"
      />
      <template #actions>
        <el-button
          @click="$refs['form-modal'].show()"
          type="success"
        >
          新增
        </el-button>
      </template>
    </base-search-form>

    <!--表格-->
    <base-table
      url="/sites/novel/source"
      :columns="columns"
      fixed-action
      ref="table"
    >
      <template #actions="{row}">
        <el-dropdown
          split-button
          trigger="click"
          size="small"
          @click="$refs['form-modal'].show(row)"
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
                dictTypes: [],
                columns: [
                    {
                        label: 'ID',
                        prop: 'id',
                        width: '100',
                        fixed: true
                    },
                    {
                        label: '基础地址',
                        prop: 'baseUrl',
                        width: '260',
                        fixed: true
                    },
                    {
                        label: '开始下标',
                        prop: 'startIndex',
                        width: '120'
                    },
                    {
                        label: '小说地址',
                        prop: 'novelUrl',
                        width: '120'
                    },
                    {
                        label: '列表名称',
                        prop: 'listName',
                        width: '200'
                    },
                    {
                        label: '章节地址',
                        prop: 'sectionUrl',
                        width: '170'
                    },
                    {
                        label: '标题名称',
                        prop: 'titleName',
                        width: '120'
                    },
                    {
                        label: '标题替换',
                        prop: 'titleReplace',
                        width: '150'
                    },
                    {
                        label: '内容名称',
                        prop: 'contentName',
                        width: '120'
                    },
                    {
                        label: '状态',
                        prop: 'isDeleted',
                        width: '100',
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
                    const title = row.isDeleted ? '恢复已删除的来源：' : '逻辑删除来源：';
                    this.$confirm(title + row.baseUrl + '，是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.axios.put('/sites/novel/source/' + row.id + '/delete/' + !row.isDeleted * 1).then(() => {
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


