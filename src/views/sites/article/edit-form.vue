<template>
  <base-form
    :params="params"
    :rules="rules"
    method="PUT"
    url="/sites/article"
    @success="handleSuccess"
    v-loading="loading"
  >
    <base-input
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
                loading: true,
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
        },
        mounted() {
          this.axios.get('/sites/article/' + this.$route.params.articleId).then(data => {
              data.article.createdTime = undefined;
              data.article.updatedTime = undefined;
              this.params = data.article;
          }).catch(res => {
              this.error(res.respMsg);
          }).finally(() => {
              this.loading = false;
          });
        }
    };
</script>
