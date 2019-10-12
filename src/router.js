import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store';

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
                    icon: 'el-icon-s-home',
                    name: '首页'
                },
                component: (resolve) => require(['./views/index.vue'], resolve)
            },
            {
                path: 'system/user',
                name: 'SYSTEM_USER',
                component: (resolve) => require(['./views/system/user/list.vue'], resolve)
            },
            {
                path: 'dict/type',
                name: 'DICT_TYPE',
                component: (resolve) => require(['./views/system/user/list.vue'], resolve)
            },
            {
                path: '/*',
                meta: {
                    icon: 'el-icon-warning',
                    name: '资源不存在'
                },
                component: (resolve) => require(['./views/404.vue'], resolve)
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            name: '用户登录'
        },
        component: (resolve) => require(['./views/login.vue'], resolve)
    }];

const router = new VueRouter({
    mode: 'history',
    routes: routers
});

router.beforeEach((to, from, next) => {
    store.commit('setLoading', true);

    if (to.name === 'login') {
        next();
        return;
    }

    let token = sessionStorage.getItem('token');
    if (token) {
        next();
    } else {
        next({
            name: 'login'
        });
    }
});

router.afterEach(() => {
    store.commit('setLoading', false);
});

export default router;