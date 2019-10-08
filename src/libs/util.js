import Vue from 'vue';

let util = {};

/**
 * 设置浏览器标题
 *
 * @param title
 */
util.title = function (title) {
    title = title ? title + ' - 后管系统' : '后管系统';
    window.document.title = title;
};

/**
 * 获取mockjs中get请求入参
 *
 * @param url
 * @returns {*}
 */
util.getRequestParameters = function (url) {
    let params = {};
    const index = url.indexOf('?');
    if (index === -1) {
        return params;
    }
    url = url.substring(index + 1).split('&');
    url.forEach(function (item) {
        const param = item.split('=');
        params[param[0]] = param[1];
    });

    return params;
};

export default util;

Vue.prototype.util = util;