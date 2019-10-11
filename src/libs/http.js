import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

// 根据环境设置基础请求地址
if (process.env.NODE_ENV === 'production') {
    axios.defaults.baseURL = '/api/';
} else if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = 'http://localhost:8080/api/';
}

// 请求拦截器
axios.interceptors.request.use(function (config) {
    const token = sessionStorage.getItem('token');
    if (!token && config.url !== '/login') {
        return Promise.reject({
            respCo: '9998',
            respMsg: '您尚未登录或登录已失效！'
        });
    }
    config.headers['token'] = token;

    return config;
}, function (error) {
    return Promise.reject({
        respCo: '9999',
        respMsg: error + ''
    });
});

// 响应拦截器
axios.interceptors.response.use(function (response) {
    if (response.data.respCo === '0000') {
        return response.data;
    } else {
        return Promise.reject(response.data);
    }
}, function (error) {
    if (!error.isAxiosError) {
        return Promise.reject(error);
    }
    return Promise.reject({
        respCo: '9999',
        respMsg: error + ''
    });
});

Vue.use(VueAxios, axios);

export default axios;