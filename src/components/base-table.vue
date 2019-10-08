<template>
  <div>
    <el-table
      :data="list"
      stripe
      border
    >
      <slot></slot>
    </el-table>

    <el-row style="margin-top: 20px;">
      <el-pagination
        :current-page="2"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="234"
      />
    </el-row>
  </div>
</template>

<script>
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
                list: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
            };
        },
        methods: {
            load: function (params) {
                this.axios.get(this.url, {params: params}).then((res) => {
                    this.list = res.data.list;
                }).catch(err => {
                    console.log(err);
                });
            }
        }
    };
</script>

