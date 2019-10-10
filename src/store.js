import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    // 全局变量
    state: {
        smallScreen: false,
        loading: false
    },
    // get变量
    getters: {
        getSmallScreen(state) {
            return state.smallScreen;
        },
        getLoading(state) {
            return state.loading;
        }
    },
    // set变量
    mutations: {
        setSmallScreen(state, smallScreen) {
            state.smallScreen = smallScreen;
        },
        setLoading(state, loading) {
            state.loading = loading;
        }
    },
    // 异步操作
    actions: {}
});