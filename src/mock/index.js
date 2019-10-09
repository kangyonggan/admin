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
    console.log(req);
    const params = getRequestParameters(req.url);

    const pageNum = params['pageNum'] * 1;
    const pageSize = params['pageSize'] * 1;

    const list = Mock.mock({
        'list|10': [{
            'id|+1': pageSize * (pageNum - 1) + 1,
            'date': '@datetime("yyyy-MM-dd HH:mm:ss")',
            'name|+1': '@cname'
        }]
    });

    console.log(Mock.Random.name());
    console.log(Mock.mock({
        name: '@name'
    }));
    console.log(Mock.mock('@name'));

    const pageInfo = {
        pageNum: pageNum,
        pageSize: pageSize,
        total: 3267
    };

    Object.assign(pageInfo, list);
    const res = Object.assign({}, response);
    res.pageInfo = pageInfo;

    return res;
});

/**
 * 获取mockjs中get请求入参
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