import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routers = [{
    path: '/',
    meta: {
        title: '首页'
    },
    component: (resolve) => require(['./views/index.vue'], resolve)
}, {
    path: '/system/user',
    meta: {
        title: '用户管理'
    },
    component: (resolve) => require(['./views/system/user/list.vue'], resolve)
}, {
    path: '*',
    meta: {
        title: '资源不存在'
    },
    component: (resolve) => require(['./views/404.vue'], resolve)
}];

export default new VueRouter({
    mode: 'history',
    routes: routers
});