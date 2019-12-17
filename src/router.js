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
        component: (resolve) => require(['./views/layout.vue'], resolve),
        children: [
            {
                path: '/',
                meta: {
                    icon: 'el-icon-s-home',
                    title: '首页'
                },
                component: (resolve) => require(['./views/index.vue'], resolve)
            },
            {
                path: 'system/user',
                meta: {
                    name: 'SYSTEM_USER'
                },
                component: (resolve) => require(['./views/system/user/list.vue'], resolve)
            },
            {
                path: 'system/role',
                meta: {
                    name: 'SYSTEM_ROLE'
                },
                component: (resolve) => require(['./views/system/role/list.vue'], resolve)
            },
            {
                path: 'system/menu',
                meta: {
                    name: 'SYSTEM_MENU'
                },
                component: (resolve) => require(['./views/system/menu/index.vue'], resolve)
            },
            {
                path: 'system/dict',
                meta: {
                    name: 'SYSTEM_DICT'
                },
                component: (resolve) => require(['./views/system/dict/list.vue'], resolve)
            },
            {
                path: 'system/upload',
                meta: {
                    name: 'SYSTEM_UPLOAD'
                },
                component: (resolve) => require(['./views/system/upload/index.vue'], resolve)
            },
            {
                path: 'sites/article',
                meta: {
                    name: 'SITES_ARTICLE'
                },
                component: (resolve) => require(['./views/sites/article/list.vue'], resolve)
            },
            {
                path: 'sites/article/create',
                meta: {
                    name: 'SITES_ARTICLE',
                    title: '发布文章'
                },
                component: (resolve) => require(['./views/sites/article/form.vue'], resolve)
            },
            {
                path: 'sites/article/:id/edit',
                meta: {
                    name: 'SITES_ARTICLE',
                    title: '编辑文章'
                },
                component: (resolve) => require(['./views/sites/article/form.vue'], resolve)
            },
            {
                path: 'sites/album',
                meta: {
                    name: 'SITES_ALBUM'
                },
                component: (resolve) => require(['./views/sites/album/list.vue'], resolve)
            },
            {
                path: 'sites/album/create',
                meta: {
                    name: 'SITES_ALBUM',
                    title: '新增相册'
                },
                component: (resolve) => require(['./views/sites/album/form.vue'], resolve)
            },
            {
                path: 'sites/album/:id/edit',
                meta: {
                    name: 'SITES_ALBUM',
                    title: '编辑相册'
                },
                component: (resolve) => require(['./views/sites/album/form.vue'], resolve)
            },
            {
                path: 'sites/video',
                meta: {
                    name: 'SITES_VIDEO'
                },
                component: (resolve) => require(['./views/sites/video/list.vue'], resolve)
            },
            {
                path: 'sites/novel/source',
                meta: {
                    name: 'SITES_NOVEL_SOURCE'
                },
                component: (resolve) => require(['./views/sites/novel/source/list.vue'], resolve)
            },
            {
                path: 'sites/novel/manager',
                meta: {
                    name: 'SITES_NOVEL_MANAGER'
                },
                component: (resolve) => require(['./views/sites/novel/manager/list.vue'], resolve)
            },
            {
                path: 'query/accessLog',
                meta: {
                    name: 'QUERY_ACCESS_LOG'
                },
                component: (resolve) => require(['./views/query/accessLog/list.vue'], resolve)
            },
            {
                path: 'query/ckLoginLog',
                meta: {
                    name: 'QUERY_CK_LOGIN_LOG'
                },
                component: (resolve) => require(['./views/query/ckLoginLog/list.vue'], resolve)
            },
            {
                path: 'user/info',
                meta: {
                    name: 'USER_INFO'
                },
                component: (resolve) => require(['./views/user/info/index.vue'], resolve)
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
    base: 'admin',
    routes: routers
});

router.beforeEach(async (to, from, next) => {
    store.commit('setLoading', true);

    // 如果是去登录界面，直接放行
    if (to.path === '/login') {
        if (to.query.logout) {
            // 登出的时候清除menus
            menus = [];
        }
        next();
        return;
    }

    // 如果没有token，重定向到登录界面
    let token = localStorage.getItem('token');
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
        loadLeafMenus(store.getters.getMenus);
    }

    // route没有name，或者name在menus中，视为有权限
    return !route.meta.name || menus.includes(route.meta.name);
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
export {routers};