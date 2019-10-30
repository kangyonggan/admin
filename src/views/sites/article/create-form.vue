<template>
  <base-form
    :params="params"
    :rules="rules"
    url="/sites/article"
    @success="handleSuccess"
  >
    <base-input
      label="标题"
      v-model="params.title"
      prop="title"
    />
    <base-input
      label="摘要"
      type="textarea"
      v-model="params.summary"
      prop="summary"
    />
    <base-input
      label="内容"
      type="textarea"
      :rows="16"
      v-model="params.content"
      prop="content"
    />
  </base-form>
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
                    summary: [
                        {required: true, message: '摘要为必填项'},
                        {max: 256, message: '摘要最多为256位'}
                    ],
                    content: [
                        {required: true, message: '内容为必填项'}
                    ]
                }
            };
        },
        methods: {
            handleSuccess() {
                this.$router.push({
                    path: '/sites/article'
                });
            }
        }
    };
</script>
