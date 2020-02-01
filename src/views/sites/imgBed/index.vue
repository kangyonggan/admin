<template>
  <div v-loading="loading">
    <ul>
      <li
        v-for="item in pageInfo.list"
        :key="item.id"
      >
        <a
          target="_blank"
          :href="'https://wx3.sinaimg.cn/large/' + item.pid + '.jpg'"
        >
          <img :src="'https://wx3.sinaimg.cn/middle/' + item.pid + '.jpg'">
        </a>
        <div class="info">
          {{ util.formatTimestamp(item.createdTime, 'yyyy-MM-dd') }}
          ({{ item.userId }})
          <span
            class="del"
            @click="del(item)"
          >
            删除
          </span>
        </div>
      </li>

      <div style="clear: both" />
    </ul>

    <el-pagination
      v-show="pageInfo.pages > 1"
      class="pagination"
      :current-page="params.pageNum"
      :page-size="params.pageSize"
      layout="prev, pager, next, ->, total"
      :total="pageInfo.total"
      @current-change="jump"
    />
  </div>
</template>

<script>
    import qs from 'qs';

    export default {
        data() {
            return {
                loading: false,
                params: {
                    pageNum: 1,
                    pageSize: 10
                },
                pageInfo: {
                    list: [],
                    total: 0
                }
            };
        },
        methods: {
            jump(pageNum) {
                this.params.pageNum = pageNum;
                this.loadData();
            },
            loadData() {
                this.loading = true;
                this.axios.get('sites/imgBed?' + qs.stringify(this.params)).then(data => {
                    this.pageInfo = data.pageInfo;
                }).catch(res => {
                    this.error(res.respMsg);
                }).finally(() => {
                    this.loading = false;
                });
            },
            del(item) {
                this.$confirm('删除用户' + item.userId + '的图片，确定吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.loading = true;
                    this.axios.delete('sites/imgBed/' + item.id).then(() => {
                        this.success('删除成功');
                        this.loadData();
                    }).catch(res => {
                        this.error(res.respMsg);
                    }).finally(() => {
                        this.loading = false;
                    });
                });
            }
        },
        mounted() {
            this.loadData();
        }
    };
</script>

<style scoped lang="scss">
  ul {
    list-style: none;

    li {
      float: left;
      height: 222px;
      width: 200px;
      margin: 20px 5px 0 5px;

      a {
        display: block;
        height: 200px;
        width: 200px;
        text-align: center;
        vertical-align: middle;

        img {
          border: 1px solid #d5d5d5;
          height: 100%;
          width: 100%;
        }
      }

      .info {
        margin-top: 3px;
        font-size: 12px;
        color: #595959;
        width: 100%;

        .del {
          float: right;
          margin-right: 10px;
          cursor: pointer;
          color: #f57a7a;
        }
      }
    }
  }

  .pagination {
    clear: both;
    margin-top: 20px;
  }
</style>