<template>
  <div style="margin-top: 20px;">
    <el-table
      :data="pageInfo.list"
      stripe
      border
      @sort-change="changeSort"
      :empty-text="emptyText"
    >
      <el-table-column
        v-for="(column, index) in columns"
        :key="index"
        :prop="column.prop"
        :label="column.label"
        :sortable="!column.sortable"
        :fixed="column.fixed"
        :width="column.width"
      >
        <template slot-scope="scope">
          <span v-if="column.render">
            {{ column.render(scope.row) }}
          </span>
          <span v-else>
            {{ scope.row[column.prop] }}
          </span>
        </template>
      </el-table-column>

      <slot />
      <el-table-column
        label="操作"
        v-if="actions"
        :fixed="fixedAction ? 'right' : false"
        width="135"
      >
        <template slot-scope="scope">
          <slot
            name="actions"
            :row="scope.row"
          />
        </template>
      </el-table-column>
    </el-table>

    <el-row
      style="margin-top: 20px;"
      v-show="pageInfo.total"
    >
      <el-pagination
        :current-page="params.pageNum"
        :page-size="params.pageSize"
        :layout="$store.getters.getSmallScreen ? 'total, sizes, prev, next, jumper' : 'total, sizes, prev, pager, next, jumper'"
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
            },
            columns: {
                required: false,
                type: Array,
                default: function () {
                    return [];
                }
            },
            actions: {
                required: false,
                type: Boolean,
                default: true
            },
            fixedAction: {
                required: false,
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
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
                this.$store.commit('setLoading', true);
                this.emptyText = '正在查询';
                this.axios.get(this.url + '?' + qs.stringify(this.params)).then(data => {
                    this.pageInfo = data.pageInfo;
                    if (!this.pageInfo.total) {
                        this.emptyText = '暂无数据';
                    }
                }).catch(res => {
                    this.pageInfo = {};
                    this.emptyText = res.respMsg;
                }).finally(() => {
                    this.$store.commit('setLoading', false);
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
                this.params.prop = column.prop;
                this.params.order = column.order;
                this.request();
            }
        },
        mounted() {
            this.request();
        }
    };
</script>

