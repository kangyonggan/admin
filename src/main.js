import Vue from 'vue';
import layout from './layout.vue';
import router from './router';
import './assets/style/reset.scss';
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';

Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
    router: router,
    render: h => h(layout),
}).$mount('#app');
