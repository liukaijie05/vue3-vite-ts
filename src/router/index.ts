// import { createRouter,createWebHistory } from "vue-router";
// const router = createRouter({
//     history: createWebHistory('/dc'), // 这里指定基本URL
//     routes: [
//         {
//             path: '/HelloWorld',
//             name: 'HelloWorld',
//             component: () => import('@/components/HelloWorld.vue')
//         },
//         {
//           path: '/home',
//           name: 'Home',
//           component: () => import('@/views/home/index.vue')
//         }
//     ]
// })
// export default router
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// 路由配置
const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layout/Layout.vue'),
    meta: { requiresAuth: true },
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
        meta: { title: '仪表盘' }
      },
      {
        path: '/user',
        name: 'User',
        component: () => import('@/views/User.vue'),
        meta: { title: '用户管理' }
      },
      // 添加用户
      {
        path: '/user/add',
        name: 'UserAdd',
        component: () => import('@/views/UserAdd.vue'),
        meta: { title: '添加用户' }
      },
      {
        path: '/system',
        name: 'System',
        component: () => import('@/views/System.vue'),
        meta: { title: '系统设置' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else if (to.path === '/login' && token) {
    next('/')
  } else {
    next()
  }
})

export default router