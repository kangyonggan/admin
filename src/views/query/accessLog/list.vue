<template>
  <div>
    <!--搜索表单-->
    <base-search-form :model="params">
      <base-select
        label="访问类型"
        v-model="params.type"
        prop="type"
        :items="accessLogTypes"
      />
      <base-input
        type="number"
        label="访问源"
        v-model="params.sourceId"
        prop="sourceId"
      />
      <base-input
        label="IP地址"
        v-model="params.ipAddress"
        prop="ipAddress"
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
      url="query/accessLog"
      :columns="columns"
      :actions="false"
      ref="table"
    />
  </div>
</template>

<script>
    export default {
        data() {
            return {
                params: {},
                accessLogTypes: [],
                columns: [
                    {
                        label: 'ID',
                        prop: 'id'
                    },
                    {
                        label: '访问类型',
                        prop: 'type',
                        render: row => {
                            return this.getAccessLogType(row.type);
                        }
                    },
                    {
                        label: '访问源',
                        prop: 'sourceId'
                    },
                    {
                        label: 'IP地址',
                        prop: 'ipAddress'
                    },
                    {
                        label: '访问时间',
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
            getAccessLogType(accessLogType) {
                for (let i = 0; i < this.accessLogTypes.length; i++) {
                    if (accessLogType === this.accessLogTypes[i].code) {
                        return this.accessLogTypes[i].name;
                    }
                }

                return accessLogType;
            }
        },
        mounted() {
            this.axios.get('enum?enumKey=AccessLogType').then(data => {
                this.accessLogTypes = data.enums;
            }).catch(res => {
                this.error(res.respMsg);
            });
        }
    };
</script>


