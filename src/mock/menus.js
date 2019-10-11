export default [
    {
        name: '系统',
        icon: 'el-icon-setting',
        children: [
            {
                name: '用户管理',
                code: 'SYSTEM_USER',
                path: '/system/user'
            },
            {
                name: '角色管理',
                code: 'SYSTEM_ROLE',
                path: '/system/role'
            },
            {
                name: '权限管理',
                code: 'SYSTEM_MENU',
                path: '/system/menu'
            },
            {
                name: '字典管理',
                code: 'SYSTEM_DICT',
                path: '/system/dict'
            }
        ]
    },
    {
        name: '网站',
        icon: 'el-icon-menu',
        children: [
            {
                name: '文章管理',
                code: 'SITES_ARTICLE',
                path: '/sites/article'
            },
            {
                name: '小说管理',
                code: 'SITES_NOVEL',
                path: '/sites/novel'
            },
            {
                name: '相册管理',
                code: 'SITES_ALBUM',
                path: '/sites/album'
            },
            {
                name: '视频管理',
                code: 'SITES_VIDEO',
                path: '/sites/video'
            }
        ]
    }
];