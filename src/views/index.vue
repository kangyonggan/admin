<template>
  <div>
    <h1>参考文档</h1>
    <ul>
      <li
        v-for="(link, index) in links"
        :key="index"
      >
        <a
          :href="link"
          target="_blank"
        >
          {{ link }}
        </a>
      </li>
    </ul>
    <h1>快速开始</h1>
    <ul>
      <li>npm install</li>
      <li>npm run mock</li>
      <li>npm run dev</li>
      <li>npm run build</li>
      <li>npm run lint</li>
    </ul>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                links: ['https://cn.vuejs.org/v2/guide/', 'https://cli.vuejs.org/zh/', 'https://element.eleme.cn/2.0/#/zh-CN',
                    'https://www.webpackjs.com/', 'https://router.vuejs.org/zh/', 'https://vuex.vuejs.org/zh/guide/',
                    'http://www.axios-js.com/', 'http://mockjs.com/', 'https://www.npmjs.com/package/mavon-editor',
                    'https://wiki.connect.qq.com/']
            };
        }
    };
</script>

<style scoped lang="scss">
  ul {
    li {
      line-height: 34px;
    }
  }
</style>