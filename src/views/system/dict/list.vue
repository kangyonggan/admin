<template>
  <div>
    <!--搜索表单-->
    <base-search-form :model="params">
      <base-select
        label="字典类型"
        v-model="params.type"
        prop="type"
        :items="dictTypes"
      />
      <base-input
        label="字典代码"
        v-model="params.code"
        prop="code"
      />
      <base-daterange
        label="创建日期"
        v-model="params.createdTime"
        prop="createdTime"
      />
      <base-input
        label="字典的值"
        placeholder="支持模糊搜索"
        v-model="params.value"
        prop="value"
      />
      <base-input
        label="备注"
        placeholder="支持模糊搜索"
        v-model="params.remark"
        prop="remark"
      />
      <template #actions>
        <el-button
          type="success"
          @click="$refs['form-modal'].show()"
        >
          新增
        </el-button>
      </template>
    </base-search-form>

    <!--表格-->
    <base-table
      url="/system/dict"
      :columns="columns"
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
                        prop: 'id'
                    },
                    {
                        label: '字典类型',
                        prop: 'type',
                        render: row => {
                            return this.formatType(row.type);
                        }
                    },
                    {
                        label: '字典代码',
                        prop: 'code'
                    },
                    {
                        label: '字典的值',
                        prop: 'value'
                    },
                    {
                        label: '备注',
                        prop: 'remark'
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
                    const title = row.isDeleted ? '恢复已删除的字典：' : '逻辑删除字典：';
                    this.$confirm(title + row.code + '，是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.axios.put('/system/dict/' + row.id + '/delete/' + !row.isDeleted * 1).then(() => {
                            this.$refs.table.request();
                        }).catch(res => {
                            this.error(res.respMsg);
                        });
                    }).catch(() => {
                    });
                }
            },
            formatType: function (type) {
                for (let i = 0; i < this.dictTypes.length; i++) {
                    let item = this.dictTypes[i];
                    if (item.code === type) {
                        return item.name;
                    }
                }

                return type;
            }
        },
        mounted() {
            this.axios.get('enum?enumKey=DictType').then(data => {
                this.dictTypes = data.enums;
            }).catch(res => {
                this.error(res.respMsg);
            });
        }
    };
</script>


