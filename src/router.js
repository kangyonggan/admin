import Vue from 'vue';
import VueRouter from 'vue-router';
import util from '@/libs/util';

Vue.use(VueRouter);

const routers = [
    {
        path: '/',
        redirect: '/index',
        component: (resolve) => require(['./views/layout.vue'], resolve),
        children: [
            {
                path: '/index',
                meta: {
                    title: '首页'
                },
                component: (resolve) => require(['./views/index.vue'], resolve)
            },
            {
                path: 'system/user',
                meta: {
                    breadcrumbs: [{
                        icon: 'el-icon-setting',
                        title: '系统'
                    }],
                    title: '用户管理'
                },
                component: (resolve) => require(['./views/system/user/list.vue'], resolve)
            }
        ]
    },
    {
        path: '/login',
        meta: {
            title: '用户登录'
        },
        component: (resolve) => require(['./views/login.vue'], resolve)
    },
    {
        path: '*',
        meta: {
            title: '资源不存在'
        },
        component: (resolve) => require(['./views/404.vue'], resolve)
    }];

const router = new VueRouter({
    mode: 'history',
    routes: routers
});

router.beforeEach((to, from, next) => {
    util.title(to.meta.title);
    next();
});

export default router;