import Mock from 'mockjs';

const response = {
    respCo: '0000',
    respMsg: '操作成功'
};

Mock.mock(/\/admin\/system\/user\??.*/, 'get', req => {
    const params = getRequestParameters(req.url);
    console.log(params);

    const pageNum = params['pageNum'] * 1;
    const pageSize = params['pageSize'] * 1;

    const list = Mock.mock({
        'list|10': [{
            'id|+1': pageSize * (pageNum - 1) + 1,
            'date': Mock.Random.date('yyyy-MM-dd'),
            'name|+1': Mock.Random.name()
        }]
    });

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
    url = url.substring(index + 1).split('&');
    url.forEach(function (item) {
        const param = item.split('=');
        params[param[0]] = param[1];
    });

    return params;
};