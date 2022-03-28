import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/admin',
    name: 'admin',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    hidden: true,
    children: [
      {
        path: "admin",
        name:"AdminIndex",
        component : () => import('../views/AdminIndex'),
        meta : {title: '首页', icon: 'link'},
        hidden: true
      },
    ]
  },
  {
    path: '/article',
    component: Layout,
    redirect: '/article/articleManage',
    name: 'article',
    meta: {
      title: '博客',
      icon: 'nested'
    },
    children: [
      {
        path: "articleManage",
        name:"articleManage",
        component : () => import('../views/article/articleManage.vue'),
        meta : {title: '博客管理'}
      },
      {
        path: "articleAdd",
        name:"articleAdd",
        component : () => import('../views/article/articleAdd.vue'),
        meta : {title: '博客添加'}
      },
    ]
  },
  {
    path: '/message',
    component: Layout,
    redirect: '/message',
    name: 'message',
    meta: {
      title: '留言',
      icon: 'nested'
    },
    children: [
      {
        path: "",
        name:"message1",
        component : () => import('../views/message/index.vue'),
        meta : {title: '留言管理'}
      },
    ]
  },
  {
    path: '/diary',
    component: Layout,
    redirect: '/diary/diaryManage',
    name: 'diary',
    meta: {
      title: '日记',
      icon: 'nested'
    },
    children: [
      {
        path: "diaryManage",
        name:"diaryManage",
        component : () => import('../views/diary/diaryManage.vue'),
        meta : {title: '日记管理'}
      },
      {
        path: "diaryAdd",
        name:"diaryAdd",
        component : () => import('../views/diary/diaryAdd.vue'),
        meta : {title: '日记添加'}
      },
    ]
  },
  {
    path: '/link',
    component: Layout,
    redirect: '/link/linkManage',
    name: 'link',
    meta: {
      title: '友链',
      icon: 'nested'
    },
    children: [
      {
        path: "linkManage",
        name:"linkManage",
        component : () => import('../views/link/linkManage.vue'),
        meta : {title: '友链管理'}
      },
      {
        path: "linkAdd",
        name:"linkAdd",
        component : () => import('../views/link/linkAdd.vue'),
        meta : {title: '友链添加'}
      },
    ]
  },
  {
    path: '/work',
    component: Layout,
    redirect: '/work/workManage',
    name: 'work',
    meta: {
      title: '作品',
      icon: 'nested'
    },
    children: [
      {
        path: "workManage",
        name:"workManage",
        component : () => import('../views/work/workManage.vue'),
        meta : {title: '作品管理'}
      },
      {
        path: "workAdd",
        name:"workAdd",
        component : () => import('../views/work/workAdd.vue'),
        meta : {title: '作品添加'}
      },
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user',
    name: 'user',
    meta: {
      title: '用户管理',
      icon: 'nested'
    },
    children: [
      {
        path: "",
        name:"user",
        component : () => import('../views/user/index.vue'),
        meta : {title: '用户管理'}
      },
    ]
  },


  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
