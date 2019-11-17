<template>
  <base-modal
    ref="modal"
    :title="params.id ? '编辑视频' : '新增视频'"
    :params="params"
    :rules="rules"
    :method="params.id ? 'PUT' : 'POST'"
    url="/sites/video"
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
      label="标题"
      v-model="params.title"
      prop="title"
    />
    <base-input
      label="标签"
      v-model="params.tags"
      prop="tags"
    />
    <base-input
      label="封面"
      v-model="params.cover"
      prop="cover"
    />
    <base-input
      label="视频代码"
      v-model="params.content"
      prop="content"
    />
  </base-modal>
</template>

<script>
    export default {
        data() {
            return {
                params: {},
                rules: {
                    title: [
                        {required: true, message: '标题为必填项'},
                        {max: 64, message: '标题最多为64位'}
                    ],
                    tags: [
                        {required: true, message: '标签为必填项'},
                        {max: 32, message: '标签最多为32位'}
                    ],
                    cover: [
                        {required: true, message: '封面为必填项'},
                        {max: 128, message: '封面最多为128位'}
                    ],
                    content: [
                        {required: true, message: '视频代码为必填项'}
                    ]
                }
            };
        },
        methods: {
            show: function (video) {
                if (!video) {
                    video = {};
                }
                this.params = Object.assign({}, video);
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