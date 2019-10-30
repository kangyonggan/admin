import Vue from 'vue';
import '@/libs/common';
import '@/libs/util';
import '@/libs/http';
import router from './router';
import app from './views/app.vue';
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import './components/index';
import store from './store';
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

if (process.env.NODE_ENV === 'mock') {
    require('./mock/index');
}

Vue.use(ElementUI);
Vue.use(mavonEditor);

new Vue({
    router: router,
    store: store,
    render: h => h(app),
}).$mount('#app');
