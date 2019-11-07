<template>
  <base-modal
    ref="modal"
    :title="params.id ? '编辑来源' : '新增来源'"
    :params="params"
    :rules="rules"
    :method="params.id ? 'PUT' : 'POST'"
    url="/sites/novel/source"
    @success="handleSuccess"
  >
    <base-input
      v-if="params.id"
      label="ID"
      v-model="params.id"
      prop="id"
      readonly
    />
    <base-input
      label="基础地址"
      v-model="params.baseUrl"
      prop="baseUrl"
    />
    <base-input
      label="开始下标"
      type="number"
      v-model="params.startIndex"
      prop="startIndex"
    />
    <base-input
      label="书籍地址"
      v-model="params.novelUrl"
      prop="novelUrl"
    />
    <base-input
      label="列表名称"
      v-model="params.listName"
      prop="listName"
    />
    <base-input
      label="章节地址"
      v-model="params.sectionUrl"
      prop="sectionUrl"
    />
    <base-input
      label="标题名称"
      v-model="params.titleName"
      prop="titleName"
    />
    <base-input
      label="标题替换"
      v-model="params.titleReplace"
      prop="titleReplace"
    />
    <base-input
      label="内容名称"
      v-model="params.contentName"
      prop="contentName"
    />
  </base-modal>
</template>

<script>
    export default {
        data() {
            return {
                params: {},
                rules: {
                    baseUrl: [
                        {required: true, message: '基础地址为必填项'},
                        {max: 64, message: '基础地址最多为64位'}
                    ],
                    startIndex: [
                        {pattern: /^[0-9]*$/, message: '必须是自然数'},
                    ],
                    novelUrl: [
                        {required: true, message: '基础地址为必填项'},
                        {max: 64, message: '基础地址最多为64位'}
                    ],
                    listName: [
                        {required: true, message: '列表名称为必填项'},
                        {max: 64, message: '列表名称最多为64位'}
                    ],
                    sectionUrl: [
                        {required: true, message: '章节地址为必填项'},
                        {max: 64, message: '章节地址最多为64位'}
                    ],
                    titleName: [
                        {required: true, message: '标题名称为必填项'},
                        {max: 64, message: '标题名称最多为64位'}
                    ],
                    titleReplace: [
                        {max: 64, message: '标题替换最多为64位'}
                    ],
                    contentName: [
                        {required: true, message: '内容名称为必填项'},
                        {max: 64, message: '内容名称最多为64位'}
                    ]
                }
            };
        },
        methods: {
            show: function (novelSource) {
                if (!novelSource) {
                    novelSource = {};
                }
                this.params = Object.assign({}, novelSource);
                this.params.createdTime = undefined;
                this.params.updatedTime = undefined;
                this.$refs.modal.show();
            },
            handleSuccess(data) {
                this.$emit('success', data);
            }
        }
    };
</script>