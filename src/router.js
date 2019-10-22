import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store';

Vue.use(VueRouter);

let menus = [];
const routers = [
    {
        path: '/login',
        meta: {
            title: '用户登录'
        },
        component: (resolve) => require(['./views/login.vue'], resolve)
    },
    {
        path: '/',
        redirect: '/index',
        component: (resolve) => require(['./views/layout.vue'], resolve),
        children: [
            {
                path: '/index',
                meta: {
                    icon: 'el-icon-s-home',
                    title: '首页'
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
                path: '403',
                meta: {
                    icon: 'el-icon-warning',
                    title: '权限不足'
                },
                component: (resolve) => require(['./views/403.vue'], resolve)
            },
            {
                path: '*',
                meta: {
                    icon: 'el-icon-warning',
                    title: '资源不存在'
                },
                component: (resolve) => require(['./views/404.vue'], resolve)
            }
        ]
    }
];

const router = new VueRouter({
    mode: 'history',
    routes: routers
});

router.beforeEach(async (to, from, next) => {
    store.commit('setLoading', true);

    // 如果是去登录界面，直接放行
    if (to.path === '/login') {
        next();
        return;
    }

    // 如果没有token，重定向到登录界面
    let token = sessionStorage.getItem('token');
    if (!token) {
        next({
            path: '/login'
        });
        return;
    }

    // Tips：只有登录之后才能走到这里

    // 登录了，但是没有权限，到403界面
    if (!checkPermission(to)) {
        next({
            path: '/403'
        });
        return;
    }

    // 鉴权成功，放行
    next();
});

router.afterEach(() => {
    store.commit('setLoading', false);
});

/**
 * 校验有没有访问路由的权限
 *
 * @param route
 */
function checkPermission(route) {
    if (!menus.length) {
        loadLeafMenus(JSON.parse(sessionStorage.getItem('menus')));
    }

    // route没有name，或者name在menus中，视为有权限
    return !route.name || menus.includes(route.name);
}

/**
 * 加载所有叶子菜单，以便鉴权使用
 *
 * @param list
 */
function loadLeafMenus(list) {
    if (!list || !list.length) {
        return;
    }
    list.forEach(function (menu) {
        if (!menu.children || !menu.children.length) {
            menus.push(menu.name);
        } else {
            loadLeafMenus(menu.children);
        }
    });
}

export default router;