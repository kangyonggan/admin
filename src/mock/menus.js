export default [
    {
        name: '系统',
        icon: 'el-icon-setting',
        children: [
            {
                name: '用户管理',
                path: '/system/user'
            },
            {
                name: '角色管理',
                path: '/system/role'
            },
            {
                name: '菜单管理',
                path: '/system/menu'
            },
            {
                name: '字典管理',
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
                path: '/sites/article'
            },
            {
                name: '小说管理',
                path: '/sites/novel'
            },
            {
                name: '相册管理',
                path: '/sites/album'
            },
            {
                name: '视频管理',
                path: '/sites/video'
            }
        ]
    }
];