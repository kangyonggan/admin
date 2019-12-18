<template>
  <div>
    <!--搜索表单-->
    <base-search-form :model="params">
      <base-input
        label="应用名称"
        v-model="params.name"
        prop="name"
      />
      <base-select
        label="审核状态"
        v-model="params.status"
        prop="status"
        :items="statusList"
      />
      <base-daterange
        label="创建日期"
        v-model="params.createdTime"
        prop="createdTime"
      />
    </base-search-form>

    <!--表格-->
    <base-table
      url="dev/oauth2AppCheck"
      :columns="columns"
      ref="table"
    >
      <template #actions="{row}">
        <el-button @click="$router.push({path: '/dev/oauth2AppCheck/' + row.id})">
          详情
        </el-button>
      </template>
    </base-table>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                params: {},
                statusList: [],
                columns: [
                    {
                        label: '应用名称',
                        prop: 'name'
                    },
                    {
                        label: '审核状态',
                        prop: 'status',
                        render: row => {
                            return this.getStatus(row.status);
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
                    }
                ]
            };
        },
        methods: {
            getStatus(status) {
                for (let i = 0; i < this.statusList.length; i++) {
                    if (status === this.statusList[i].code) {
                        return this.statusList[i].name;
                    }
                }
            }
        },
        mounted() {
            this.axios.get('enum?enumKey=Status').then(data => {
                this.statusList = data.enums;
            }).catch(res => {
                this.error(res.respMsg);
            });
        }
    };
</script>


