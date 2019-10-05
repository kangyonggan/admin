<template>
  <div>
    <el-form
      :inline="true"
      :model="params"
    >
      <el-row>
        <el-form-item label="账号">
          <el-input
            v-model="params.account"
            clearable
          />
        </el-form-item>
        <el-form-item label="创建日期">
          <el-date-picker
            type="daterange"
            v-model="params.createdTime"
          />
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item>
          <el-button
            type="primary"
          >
            查询
          </el-button>
          <el-button
            type="warning"
          >
            清空
          </el-button>
          <el-button
            type="success"
          >
            新增
          </el-button>
        </el-form-item>
      </el-row>
    </el-form>

    <el-table
      :data="tableData"
      stripe
      border
    >
      <el-table-column
        prop="date"
        label="日期"
        sortable
      />
      <el-table-column
        prop="name"
        label="姓名"
        sortable
      />
      <el-table-column
        prop="address"
        label="地址"
        sortable
      />
    </el-table>

    <el-row style="margin-top: 20px;">
      <el-pagination
          :current-page="2"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
  export default {
      data() {
          return {
              params: {},
              tableData: [{
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
      }
  };
</script>

