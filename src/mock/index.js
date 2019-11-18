import Mock from 'mockjs';
import qs from 'qs';
import menus from './menus';

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
Mock.mock('login', 'post', req => {
    const params = qs.parse(req.body);
    if (params.account === 'admin' && params.password === 'admin') {
        // 模拟不了response headers，直接放session
        localStorage.setItem('token', Mock.Random.string());

        return Object.assign({
            data: {
                menus: menus,
                user: {
                    id: Mock.Random.natural(),
                    name: Mock.Random.cname()
                }
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
Mock.mock('logout', 'get', () => {
    const res = invalidLogin();
    if (res) {
        return res;
    }
    return response;
});

/**
 * 用户列表
 */
Mock.mock(/system\/user\?.*/, 'get', req => {
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
Mock.mock('system/user', 'post', () => {
    const res = invalidLogin();
    if (res) {
        return res;
    }

    return response;
});

/**
 * 更新用户
 */
Mock.mock('system/user', 'put', () => {
    const res = invalidLogin();
    if (res) {
        return res;
    }

    return response;
});

/**
 * 校验用户名是否存在
 */
Mock.mock(/validate\/account\?.*/, 'get', req => {
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

/**
 * 用户角色查询
 */
Mock.mock(/system\/user\/[0-9]+\/role/, 'get', () => {
    const res = invalidLogin();
    if (res) {
        return res;
    }

    const allRoles = Mock.mock({
        'list|10': [{
            id: '@integer(1,10000)',
            name: '@ctitle(2,8)'
        }]
    });
    const userRoleIds = Mock.mock(function () {
        const arr = [];
        allRoles.list.forEach(function (item) {
            if (Mock.Random.boolean()) {
                arr.push(item.id);
            }
        });

        return arr;
    });

    return Object.assign({
        data: {
            userRoleIds: userRoleIds,
            allRoles: allRoles.list
        }
    }, response);
});

/**
 * 更新用户角色
 */
Mock.mock(/system\/user\/[0-9]+\/role/, 'put', () => {
    const res = invalidLogin();
    if (res) {
        return res;
    }

    return response;
});

/**
 * 更新用户状态
 */
Mock.mock(/system\/user\/[0-9]+\/delete\/[01]/, 'put', () => {
    const res = invalidLogin();
    if (res) {
        return res;
    }

    return response;
});

/**
 * 修改用户密码
 */
Mock.mock(/system\/user\/[0-9]+\/password/, 'put', () => {
    const res = invalidLogin();
    if (res) {
        return res;
    }

    return response;
});

/**************************************** 下面是通用的工具方法 ***************************************/
/**
 * 模拟返回异常，概率20%
 *
 * @returns {*}
 */
const invalidLogin = function () {
    if (Mock.Random.boolean(2, 8, true)) {
        if (Mock.Random.boolean(2, 8)) {
            return {
                respCo: '9997',
                respMsg: '权限不足，请联系管理员！'
            };
        } else if (Mock.Random.boolean(3, 7)) {
            return {
                respCo: '9998',
                respMsg: '您尚未登录或登录已失效！'
            };
        } else {
            return {
                respCo: '9999',
                respMsg: '网络异常，请稍后再试！'
            };
        }
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
        data: {
            pageInfo: pageInfo
        }
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