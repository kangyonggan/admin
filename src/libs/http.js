import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
import VueAxios from 'vue-axios';

if (process.env.NODE_ENV === 'production') {
    axios.defaults.baseURL = '/api/';
} else if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = 'http://localhost:8080/api/';
}

Vue.use(VueAxios, axios);

/**
 * 封装get请求
 *
 * @param url
 * @param params
 */
Vue.prototype.get = function(url, params) {
    if (params) {
        url += '?' + qs.stringify(this.params);
    }
    return new Promise(function(resolve, reject) {
        axios.get(url).then((res) => {
            if (res.data.success) {
                resolve(res.data);
            } else {
                reject(res.data.msg);
            }
        }).catch(err => {
            reject(err + '');
        });
    });
};

/**
 * 封装post请求
 *
 * @param url
 * @param params
 */
Vue.prototype.post = function(url, params) {
    return new Promise(function(resolve, reject) {
        axios.post(url, params).then((res) => {
            if (res.data.success) {
                resolve(res.data);
            } else {
                reject(res.data.msg);
            }
        }).catch(err => {
            reject(err + '');
        });
    });
};
