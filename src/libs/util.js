import Vue from 'vue';

let util = {};

/**
 * 设置浏览器标题
 *
 * @param title
 */
util.title = function (title) {
    title = title ? title + ' · 康永敢控制台' : '康永敢控制台';
    window.document.title = title;
};

/**
 * 格式化状态
 *
 * @param isDeleted
 */
util.formatStatus = function (isDeleted) {
    return isDeleted ? '已删除' : '正常';
};

/**
 * 时间戳格式化
 *
 * @param timestamp
 * @param format
 */
util.formatTimestamp = function (timestamp, format) {
    let date = new Date(timestamp);
    let o = {
        'M+': date.getMonth() + 1,                 //月份
        'd+': date.getDate(),                    //日
        'H+': date.getHours(),                   //小时
        'm+': date.getMinutes(),                 //分
        's+': date.getSeconds(),                 //秒
        'q+': Math.floor((date.getMonth() + 3) / 3), //季度
        'S': date.getMilliseconds()             //毫秒
    };

    if (!format) {
        format = 'yyyy-MM-dd HH:mm:ss';
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
    }
    return format;
};

export default util;

Vue.prototype.util = util;