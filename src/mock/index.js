import Mock from 'mockjs';
import qs from 'qs';

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
            'date': Mock.Random.date('yyyy-MM-dd'),
            'name|+1': Mock.Random.name()
        }]
    });

    console.log(Mock.mock({
        'name|3-5': 'abc'
    }));
    console.log(Mock.mock({
        'name|2': 'abc'
    }));
    console.log(Mock.mock({
        'name|1-10': 0
    }));
    console.log(Mock.mock({
        'name|1-10.2-3': 0
    }));
    console.log(Mock.mock({
        'name|1': true
    }));
    console.log(Mock.mock({
        'name|2': {a: 1, b: 2, c: 3, d: 4}
    }));
    console.log(Mock.mock({
        'name|2-3': {a: 1, b: 2, c: 3, d: 4}
    }));
    console.log(Mock.mock({
        'name|1': [1, 2, 3, 4]
    }));
    console.log(Mock.mock({
        'name|2': [1, 2, 3, 4]
    }));
    console.log(Mock.mock({
        'name|1-2': [1, 2, 3, 4]
    }));
    console.log(Mock.mock({
        'name': function () {
            return Math.random().toFixed(2);
        }
    }));
    console.log(Mock.mock({
        'name': /[a-z][0-3][A-Z][1-2][0-9]*_?\d/
    }));
    console.log(Mock.mock({
        'name': {
            first: '@first',
            last: '@last',
            fullname: '@first @last'
        }
    }));

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