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
      label="标题"
      v-model="params.title"
      prop="title"
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
                video.createdTime = undefined;
                video.updatedTime = undefined;
                this.params = Object.assign({}, video);
                this.$refs.modal.show();
            },
            handleSuccess(data) {
                this.$emit('success', data);
            }
        }
    };
</script>