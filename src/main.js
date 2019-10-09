import Vue from 'vue';
import '@/libs/util';
import '@/libs/http';
import router from './router';
import layout from './views/layout.vue';
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import './components/index';
import store from './store';

if (process.env.NODE_ENV === 'mock') {
    require('./mock/index');
}

Vue.use(ElementUI);

new Vue({
    router: router,
    store: store,
    render: h => h(layout),
}).$mount('#app');
