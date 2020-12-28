<template>
  <div>
    <!--搜索表单-->
    <base-search-form :model="params">
      <base-input
        label="账户标识"
        v-model="params.openid"
        prop="openid"
      />
      <base-input
        label="内容"
        v-model="params.content"
        prop="content"
      />
      <base-select
        label="类型"
        v-model="params.type"
        prop="type"
        :items="types"
      />
      <base-select
        label="状态"
        v-model="params.status"
        prop="status"
        :items="statuses"
      />
      <base-daterange
        label="创建日期"
        v-model="params.createdTime"
        prop="createdTime"
      />
    </base-search-form>

    <!--表格-->
    <base-table
      url="sites/note"
      :columns="columns"
      ref="table"
    >
      <template #actions="{row}">
        <el-button
          size="small"
          @click="$refs['detail-modal'].show(row)"
        >
          查看
        </el-button>
      </template>
    </base-table>

    <!--查看界面-->
    <detail-modal ref="detail-modal" />
  </div>
</template>

<script>
import DetailModal from './detail-modal';

export default {
  components: {DetailModal},
  data() {
    return {
      params: {
        openid: '',
        content: '',
        type: '',
        status: ''
      },
      types: [{code: 'TODO', name: '待办'}, {code: 'NOTE', name: '笔记'}],
      statuses: [{code: 'NORMAL', name: '正常'}, {code: 'FINISH', name: '完成'}],
      columns: [
        {
          label: 'ID',
          prop: 'id',
          width: '80'
        },
        {
          label: '用户标识',
          prop: 'openid',
          width: '260'
        },
        {
          label: '类型',
          prop: 'type',
          width: '80',
          render: row => {
            return row.type === 'TODO' ? '待办' : '笔记';
          }
        },
        {
          label: '状态',
          prop: 'status',
          width: '80',
          render: row => {
            return row.status === 'NORMAL' ? '正常' : '完成';
          }
        },
        {
          label: '置顶',
          prop: 'isTopped',
          width: '100',
          render: row => {
            return row.isTopped ? '是' : '否';
          }
        },
        {
          label: '创建时间',
          prop: 'createdTime',
          width: '180',
          render: row => {
            return this.util.formatTimestamp(row.createdTime);
          }
        },
        {
          label: '内容',
          prop: 'content',
          render: row => {
            return row.type === 'TODO' ? row.content : '...';
          }
        }
      ]
    };
  }
};
</script>


