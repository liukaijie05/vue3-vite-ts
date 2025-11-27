export interface MenuItem {
  path: string
  name: string
  title: string
  icon?: string
  children?: MenuItem[]
}

export const menuItems: MenuItem[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    title: '仪表盘',
    icon: 'PieChart'
  },
  {
    path: '/user',
    name: 'User',
    title: '用户管理',
    icon: 'User',
    children: [
      {
        path: '/user',
        name: 'UserList',
        title: '用户列表'
      },
      {
        path: '/user/add',
        name: 'UserAdd',
        title: '添加用户'
      }
    ]
  },
  {
    path: '/system',
    name: 'System',
    title: '系统设置',
    icon: 'Setting'
  }
]