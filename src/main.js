import Vue from 'vue';
import layout from './layout.vue';
import router from './router';
import './assets/style/reset.scss';
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.component(CollapseTransition.name, CollapseTransition);

new Vue({
    router: router,
    render: h => h(layout),
}).$mount('#app');
