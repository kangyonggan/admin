<template>
  <div>
    <!--搜索表单-->
    <base-search-form
      :model="params"
      :rules="rules"
    >
      <base-input
        label="用户ID"
        v-model="params.userId"
        prop="userId"
      />
      <base-input
        label="手机号/账号"
        v-model="params.mobileNo"
        prop="mobileNo"
      />
      <base-input
        label="角色名"
        v-model="params.name"
        prop="name"
      />
      <base-input
        label="登录IP"
        v-model="params.ipAddr"
        prop="ipAddr"
      />
      <base-select
        label="登录来源"
        :items="appSources"
        v-model="params.appSource"
        prop="appSource"
      />
      <base-daterange
        label="登录日期"
        v-model="params.date"
        prop="date"
      />
    </base-search-form>

    <!--表格-->
    <base-table
      url="query/ckLoginLog"
      :columns="columns"
      :actions="false"
      ref="table"
      lazy
    />
  </div>
</template>

<script>
    export default {
        data() {
            return {
                params: {},
                appSources: [{
                    code: '001',
                    name: '官方网站'
                }, {
                    code: '002',
                    name: '客户端'
                }, {
                    code: '003',
                    name: '小程序'
                }],
                rules: {
                    name: [
                        {validator: this.validateQuery}
                    ],
                    mobileNo: [
                        {validator: this.validateQuery}
                    ],
                    ipAddr: [
                        {validator: this.validateQuery}
                    ]
                },
                columns: [
                    {
                        label: '用户ID',
                        prop: 'userId'
                    },
                    {
                        label: '区号/渠道',
                        prop: 'areaCode'
                    },
                    {
                        label: '手机号/账号',
                        prop: 'mobileNo'
                    },
                    {
                        label: '角色名',
                        prop: 'name'
                    },
                    {
                        label: '登录来源',
                        prop: 'appSource',
                        render: row => {
                            return this.getAppSource(row.appSource);
                        }
                    },
                    {
                        label: '登录IP',
                        prop: 'ipAddr'
                    },
                    {
                        label: '登录时间',
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
            validateQuery(rule, value, callback) {
                if (!this.params.name && !this.params.mobileNo && !this.params.ipAddr) {
                    callback(new Error('角色名/手机号/登录IP至少填一个'));
                    return;
                }
                callback();
            },
            getAppSource(appSource) {
                for (let i = 0; i < this.appSources.length; i++) {
                    if (appSource === this.appSources[i].code) {
                        return this.appSources[i].name;
                    }
                }
                return appSource;
            }
        }
    };
</script>


