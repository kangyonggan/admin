import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    // 全局变量
    state: {
        // 是否是小屏幕
        smallScreen: false,
        // <el-main>是否处于加载中
        loading: false,
        user: JSON.parse(localStorage.getItem('user')) || {},
        menus: JSON.parse(localStorage.getItem('menus')) || []
    },
    // get变量
    getters: {
        getSmallScreen(state) {
            return state.smallScreen;
        },
        getLoading(state) {
            return state.loading;
        },
        getUser(state) {
            return state.user;
        },
        getMenus(state) {
            return state.menus;
        }
    },
    // set变量
    mutations: {
        setSmallScreen(state, smallScreen) {
            state.smallScreen = smallScreen;
        },
        setLoading(state, loading) {
            state.loading = loading;
        },
        setUser(state, user) {
            state.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        },
        setMenus(state, menus) {
            state.menus = menus;
            localStorage.setItem('menus', JSON.stringify(menus));
        }
    },
    // 异步操作
    actions: {}
});