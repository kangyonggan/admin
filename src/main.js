import Vue from 'vue';
import layout from './layout.vue';
import router from './router';
import './assets/style/reset.scss';

Vue.config.productionTip = false;

new Vue({
    router: router,
    render: h => h(layout),
}).$mount('#app');
