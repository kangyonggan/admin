<template>
  <base-modal
    ref="modal"
    :title="params.id ? '编辑书籍' : '新增书籍'"
    :params="params"
    :rules="rules"
    :method="params.id ? 'PUT' : 'POST'"
    url="/sites/novel/manager"
    @success="handleSuccess"
  >
    <base-input
      v-if="params.id"
      label="ID"
      v-model="params.id"
      prop="id"
      readonly
    />
    <base-select
      label="来源"
      v-model="params.sourceId"
      prop="sourceId"
      :items="novelSources"
      code="id"
      name="baseUrl"
    />
    <base-input
      label="书名"
      v-model="params.name"
      prop="name"
    />
    <base-input
      label="代码"
      v-model="params.code"
      prop="code"
    />
    <base-input
      label="作者"
      v-model="params.author"
      prop="author"
    />
    <base-input
      label="推荐指数"
      v-model="params.hold"
      prop="hold"
    />
    <base-input
      label="封面"
      v-model="params.cover"
      prop="cover"
    />
    <base-input
      label="简介"
      type="textarea"
      v-model="params.summary"
      prop="summary"
    />
  </base-modal>
</template>

<script>
    export default {
        data() {
            return {
                params: {},
                novelSources: [],
                rules: {
                    sourceId: [
                        {required: true, message: '来源为必选项'}
                    ],
                    name: [
                        {required: true, message: '书名为必填项'},
                        {max: 32, message: '书名最多为32位'}
                    ],
                    code: [
                        {required: true, message: '代码为必填项'},
                        {max: 20, message: '代码最多为20位'}
                    ],
                    author: [
                        {required: true, message: '作者为必填项'},
                        {max: 32, message: '作者最多为32位'}
                    ],
                    hold: [
                        {required: true, message: '推荐指数为必填项'},
                        {pattern: /^[0-5]$/, message: '推荐指数是0~5'},
                    ],
                    cover: [
                        {required: true, message: '封面为必填项'},
                        {max: 256, message: '封面最多为256位'}
                    ],
                    summary: [
                        {required: true, message: '简介为必填项'},
                        {max: 2048, message: '简介最多为2048位'}
                    ]
                }
            };
        },
        methods: {
            show: function (novelSources, novel) {
                if (!novel) {
                    novel = {};
                }
                this.novelSources = novelSources;
                this.params = Object.assign({}, novel);
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