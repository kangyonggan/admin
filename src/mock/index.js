import Mock from 'mockjs';
import qs from 'qs';

// 默认响应时间：10-100ms
Mock.setup({
    timeout: '10-1500'
});

const response = {
    success: true,
    msg: '操作成功'
};

Mock.mock(/\/admin\/system\/user\??.*/, 'get', req => {
    const params = getRequestParameters(req.url);
    const pageNum = params['pageNum'] * 1;
    const pageSize = params['pageSize'] * 1;

    const list = Mock.mock(function () {
        const list = [];
        for (let i = 0; i < pageSize; i++) {
            const item = {};
            item.id = (pageNum - 1) * pageSize + 1 + i;
            item.account = Mock.mock(/[a-zA-Z][a-zA-Z0-9]{4,19}/);
            item.name = Mock.Random.cname();
            item.isDeleted = Mock.Random.boolean() * 1;
            item.createdTime = getRandomTimestamp();

            list.push(item);
        }

        return list;
    });

    return getResponseWithPageInfo(list);
});

/**************************************** 下面是通用的工具方法 ***************************************/

/**
 * 获取一个随机时间戳
 *
 * @returns {number}
 */
const getRandomTimestamp = function () {
    let arr = Mock.Random.datetime('yyyy,MM,dd,HH,mm,ss,SSS').split(',');
    return new Date(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6]).getTime();
};


/**
 * 组装一个带有pageInfo的响应
 *
 * @param list
 */
const getResponseWithPageInfo = function (list) {
    const pageInfo = {
        total: 53267,
        list: list
    };
    return Object.assign({
        pageInfo: pageInfo
    }, response);
};

/**
 * 获取url中的参数
 *
 * @param url
 * @returns {*}
 */
const getRequestParameters = function (url) {
    let params = {};
    const index = url.indexOf('?');
    if (index === -1) {
        return params;
    }
    return qs.parse(url.substring(index + 1));
};