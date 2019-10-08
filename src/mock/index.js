import Mock from 'mockjs';
import util from '@/libs/util';

Mock.mock(/\/admin\/system\/user\??.*/, 'get', req => {
    const params = util.getRequestParameters(req.url);

    const pageNum = params['pageNum'] * 1;
    const pageSize = params['pageSize'] * 1;

    return Mock.mock({
        'list|10': [{
            'id|+1': pageSize * (pageNum - 1) + 1,
            'date': Mock.Random.date('yyyy-MM-dd'),
            'name|+1': Mock.Random.name()
        }]
    });
});