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
                pageInfo: {}
            };
        },
        methods: {
            request: function () {
                this.loading = true;
                this.axios.get(this.url + '?' + qs.stringify(this.params)).then((res) => {
                    this.pageInfo = res.data.pageInfo;
                }).catch(err => {
                    console.error(err);
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

