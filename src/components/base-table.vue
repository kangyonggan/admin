<template>
  <div
    v-loading="loading"
    style="margin-top: 20px;"
  >
    <el-table
      :data="pageInfo.list"
      stripe
      border
      @sort-change="changeSort"
      :empty-text="emptyText"
    >
      <slot />
    </el-table>

    <el-row
      style="margin-top: 20px;"
      v-show="pageInfo.total"
    >
      <el-pagination
        :current-page="params.pageNum"
        :page-size="params.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total"
        @next-click="jump"
        @prev-click="jump"
        @current-change="jump"
        @size-change="changeSize"
      />
    </el-row>
  </div>
</template>

<script>
    import qs from 'qs';

    export default {
        props: {
            url: {
                required: false,
                type: String,
                default: ''
            }
        },
        data() {
            return {
                loading: false,
                params: {
                    pageNum: 1,
                    pageSize: 10
                },
                emptyText: '正在查询',
                pageInfo: {}
            };
        },
        methods: {
            request: function () {
                this.loading = true;
                this.emptyText = '正在查询';
                this.axios.get(this.url + '?' + qs.stringify(this.params)).then((res) => {
                    if (res.data.success && res.data.pageInfo) {
                        this.pageInfo = res.data.pageInfo;
                        if (!this.pageInfo.total) {
                            this.emptyText = '暂无数据';
                        }
                    } else {
                        console.log(111);
                        this.pageInfo = {};
                        this.emptyText = res.data.msg;
                    }
                }).catch(err => {
                    this.emptyText = err + '';
                }).finally(() => {
                    this.loading = false;
                });
            },
            reload: function (params) {
                if (!params) {
                    params = {};
                }
                this.params = Object.assign({
                    pageNum: 1,
                    pageSize: this.params.pageSize,
                    sortColumn: this.params.sortColumn,
                    sortOrder: this.params.sortOrder
                }, params);
                this.request();
            },
            jump: function (pageNum) {
                this.params.pageNum = pageNum;
                this.request();
            },
            changeSize: function (pageSize) {
                this.params.pageNum = 1;
                this.params.pageSize = pageSize;
                this.request();
            },
            changeSort: function (column) {
                this.params.pageNum = 1;
                if (column.order) {
                    this.params.sortColumn = column.prop;
                    this.params.sortOrder = column.order === 'ascending' ? 0 : 1;
                } else {
                    this.params.sortColumn = undefined;
                    this.params.sortOrder = undefined;
                }
                this.request();
            }
        },
        mounted() {
            this.request();
        }
    };
</script>
