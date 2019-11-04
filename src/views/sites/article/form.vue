<template>
  <base-form
    :params="params"
    :rules="rules"
    :method="params.id ? 'PUT' : 'POST'"
    url="/sites/article"
    @success="handleSuccess"
    v-loading="loading"
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
    <base-markdown
      label="内容"
      v-model="params.content"
      prop="content"
    />
  </base-form>
</template>

<script>
    export default {
        data() {
            return {
                loading: false,
                params: {},
                rules: {
                    title: [
                        {required: true, message: '标题为必填项'},
                        {max: 64, message: '标题最多为64位'}
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
            let id = this.$route.params.id;
            if (id) {
                this.loading = true;
                this.axios.get('sites/article/' + id).then(data => {
                    data.article.createdTime = undefined;
                    data.article.updatedTime = undefined;
                    data.article.viewNum = undefined;
                    this.params = data.article;
                }).catch(res => {
                    this.error(res.respMsg);
                }).finally(() => {
                    this.loading = false;
                });
            }
        }
    };
</script>
