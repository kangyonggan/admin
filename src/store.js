import Vue from 'vue';
import Vuex from 'vuex';
import http from './libs/http';

Vue.use(Vuex);

export default new Vuex.Store({
    // 全局变量
    state: {
        // 当前登录的用户
        user: undefined,
        // 当前登录的用户所拥有的菜单
        menus: undefined,
        // 是否是小屏幕
        smallScreen: false,
        // <el-main>是否处于加载中
        loading: false
    },
    // get变量
    getters: {
        getUser(state) {
            return state.user;
        },
        getMenus(state) {
            return state.menus;
        },
        getSmallScreen(state) {
            return state.smallScreen;
        },
        getLoading(state) {
            return state.loading;
        }
    },
    // set变量
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setMenus(state, menus) {
            state.menus = menus;
        },
        setSmallScreen(state, smallScreen) {
            state.smallScreen = smallScreen;
        },
        setLoading(state, loading) {
            state.loading = loading;
        }
    },
    // 异步操作
    actions: {
        /**
         * 同步包异步获取登录数据
         *
         * @param context
         * @returns {Promise<any>}
         */
        getLoginData(context) {
            return new Promise((resolve, reject) => {
                if (!context.state.user) {
                    http.get('/loginData').then(data => {
                        context.commit('setMenus', data.menus);
                        context.commit('setUser', data.user);
                        resolve();
                    }).catch(data => {
                        reject(data);
                    });
                } else {
                    resolve();
                }
            });
        }
    }
});