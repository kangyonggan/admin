import Vue from 'vue';
import '@/libs/util';
import '@/libs/http';
import router from './router';
import layout from './views/layout.vue';
import './assets/style/reset.scss';
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import './components/index';

if (process.env.NODE_ENV === 'mock') {
    require('./mock/index');
}

Vue.use(ElementUI);

new Vue({
    router: router,
    render: h => h(layout),
}).$mount('#app');
