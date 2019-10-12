export default [
    {
        name: '系统',
        code: 'SYSTEM',
        icon: 'el-icon-setting',
        children: [
            {
                name: '用户管理',
                code: 'SYSTEM_USER',
                url: '/system/user'
            },
            {
                name: '角色管理',
                code: 'SYSTEM_ROLE',
                url: '/system/role'
            },
            {
                name: '菜单管理',
                code: 'SYSTEM_MENU',
                url: '/system/menu'
            },
            {
                name: '字典管理',
                code: 'DICT',
                children: [
                    {
                        name: '字典类型',
                        code: 'DICT_TYPE',
                        url: '/dict/type'
                    },
                    {
                        name: '字典数据',
                        code: 'DICT_DATA',
                        url: '/dict/data'
                    }
                ]
            }
        ]
    },
    {
        name: '网站',
        code: 'SITES',
        icon: 'el-icon-menu',
        children: [
            {
                name: '文章管理',
                code: 'SITES_ARTICLE',
                url: '/sites/article'
            },
            {
                name: '小说管理',
                code: 'SITES_NOVEL',
                url: '/sites/novel'
            },
            {
                name: '相册管理',
                code: 'SITES_ALBUM',
                url: '/sites/album'
            },
            {
                name: '视频管理',
                code: 'SITES_VIDEO',
                url: '/sites/video'
            }
        ]
    },
    {
        name: '修改密码',
        code: 'PASSWORD',
        icon: 'el-icon-lock',
        url: '/password'
    }
];