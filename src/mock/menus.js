export default [
    {
        title: '系统',
        name: 'SYSTEM',
        icon: 'el-icon-setting',
        children: [
            {
                title: '用户管理',
                name: 'SYSTEM_USER',
                path: '/system/user'
            },
            {
                title: '角色管理',
                name: 'SYSTEM_ROLE',
                path: '/system/role'
            },
            {
                title: '菜单管理',
                name: 'SYSTEM_MENU',
                path: '/system/menu'
            },
            {
                title: '字典管理',
                name: 'DICT',
                children: [
                    // {
                    //     title: '字典类型',
                    //     name: 'DICT_TYPE',
                    //     path: '/dict/type'
                    // },
                    {
                        title: '字典数据',
                        name: 'DICT_DATA',
                        path: '/dict/data'
                    }
                ]
            }
        ]
    },
    {
        title: '网站',
        name: 'SITES',
        icon: 'el-icon-menu',
        children: [
            {
                title: '文章管理',
                name: 'SITES_ARTICLE',
                path: '/sites/article'
            },
            {
                title: '小说管理',
                name: 'SITES_NOVEL',
                path: '/sites/novel'
            },
            {
                title: '相册管理',
                name: 'SITES_ALBUM',
                path: '/sites/album'
            },
            {
                title: '视频管理',
                name: 'SITES_VIDEO',
                path: '/sites/video'
            }
        ]
    },
    {
        title: '修改密码',
        name: 'PASSWORD',
        icon: 'el-icon-lock',
        path: '/password'
    }
];