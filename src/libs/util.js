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

export default util;

Vue.prototype.util = util;