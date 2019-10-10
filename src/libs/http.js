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
    config.headers['token'] = sessionStorage.getItem('token');

    return config;
}, function (error) {
    return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use(function (response) {
    console.log(response);
    if (response.data.respCo === '0000') {
        return response.data;
    } else {
        return Promise.reject(response.data);
    }
}, function (error) {
    return Promise.reject({
        respCo: '9999',
        respMsg: error + ''
    });
});

Vue.use(VueAxios, axios);
