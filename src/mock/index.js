import Mock from 'mockjs';
import qs from 'qs';

// 默认响应时间：10-100ms
Mock.setup({
    timeout: '10-1500'
});

const response = {
    respCo: '0000',
    respMsg: '操作成功'
};

/**
 * 登录
 */
Mock.mock('/login', 'post', req => {
    const params = JSON.parse(req.body);
    if (params.account === 'admin' && params.password === 'admin') {
        return Object.assign({
            token: Mock.Random.string(),
            user: {
                account: params.account,
                name: '管理员'
            }
        }, response);
    }

    return {
        respCo: '9999',
        respMsg: '账号或密码错误'
    };
});

/**
 * 退出
 */
Mock.mock('/logout', 'get', () => {
    const res = invalidLogin();
    if (res) {
        return res;
    }
    return response;
});

/**
 * 用户列表
 */
Mock.mock(/\/system\/user\??.*/, 'get', req => {
    const res = invalidLogin();
    if (res) {
        return res;
    }

    const params = getRequestParameters(req.url);
    const pageSize = params['pageSize'] * 1;

    const list = Mock.mock(function () {
        const list = [];
        for (let i = 0; i < pageSize; i++) {
            const item = {};
            item.id = Mock.Random.natural();
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

/**
 * 新增用户
 */
Mock.mock('/system/user', 'post', () => {
    const res = invalidLogin();
    if (res) {
        return res;
    }

    return response;
});

/**
 * 校验用户名是否存在
 */
Mock.mock(/\/validate\/account\??.*/, 'get', req => {
    const params = getRequestParameters(req.url);
    const account = params['account'];
    if (account === 'admin') {
        return {
            respCo: '9999',
            respMsg: '账号已被占用'
        };
    }

    return response;
});

/**************************************** 下面是通用的工具方法 ***************************************/
/**
 * 模拟session失效，返回9998，概率30%
 *
 * @returns {*}
 */
const invalidLogin = function () {
    if (Mock.Random.boolean(3, 7, true)) {
        return {
            respCo: '9998',
            respMsg: '您尚未登录或登录已失效！'
        };
    }

    return false;
};

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