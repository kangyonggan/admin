<template>
  <el-dialog
    ref="dialog"
    :visible.sync="dialogVisible"
    title="查看内容"
  >
    <span>
      {{ note.content }}
    </span>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="dialogVisible = false">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
    export default {
        data() {
            return {
              dialogVisible: false,
              note: {}
            };
        },
        methods: {
            show: function (note) {
                this.note = note;
                this.dialogVisible = true;
            }
        }
    };
</script>