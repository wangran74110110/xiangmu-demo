import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
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
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/brand',  //路由路径
    component: Layout, //嵌入的父类模板
    redirect: '/brand/brands',  //重定向的路由
    name: 'Brand',  //路由名称
    meta: { title: '品牌管理', icon: 'brand' },
    children: [
      {
        path: 'brands',
        name: 'Brands',  //二级路由 设置名字最好带上一级路由的名字
        component: () => import('@/views/brand/brands/index'),
        meta: { title: '品牌列表', icon: 'brand' }
      },
    ]
  },

  {
    path: '/stock',  //路由路径
    component: Layout, //嵌入的父类模板
    redirect: '/stock/stocks',  //重定向的路由
    name: 'Stock',  //路由名称
    meta: { title: '库存管理', icon: 'stock' },
    children: [
      {
        path: 'stocks',
        name: 'Stocks',  //二级路由 设置名字最好带上一级路由的名字
        component: () => import('@/views/stock/stocks/index'),
        meta: { title: '库存列表', icon: 'stock' }
      },
    ]
  },
  
  {
    path: '/dictionaries',  //路由路径
    component: Layout, //嵌入的父类模板
    redirect: '/dictionaries/dictionariess',  //重定向的路由
    name: 'Dictionaries',  //路由名称
    meta: { title: '字典管理', icon: 'dictionaries' },
    children: [
      {
        path: 'dictionariess',
        name: 'Dictionariess',  //二级路由 设置名字最好带上一级路由的名字
        component: () => import('@/views/dictionaries/dictionariess/index'),
        meta: { title: '字典列表', icon: 'dictionaries' }
      },
    ]
  },

  {
    path: '/commodity',  //路由路径
    component: Layout, //嵌入的父类模板
    redirect: '/commodity/commoditys',  //重定向的路由
    name: 'Commodity',  //路由名称
    meta: { title: '商品管理', icon: 'commodity' },
    children: [
      {
        path: 'commoditys',
        name: 'Commoditys',  //二级路由 设置名字最好带上一级路由的名字
        component: () => import('@/views/commodity/commoditys/index'),
        meta: { title: '商品列表', icon: 'commodity' }
      },
    ]
  },
  {
    path: '/classification',  //路由路径
    component: Layout, //嵌入的父类模板
    redirect: '/classification/classifications',  //重定向的路由
    name: 'Classification',  //路由名称
    meta: { title: '分类管理', icon: 'classification' },
    children: [
      {
        path: 'classifications',
        name: 'Classifications',  //二级路由 设置名字最好带上一级路由的名字
        component: () => import('@/views/classification/classifications/index'),
        meta: { title: '分类列表', icon: 'classification' }
      },
    ]
  },
  
  {
    path: '/material',  //路由路径
    component: Layout, //嵌入的父类模板
    redirect: '/material/materials',  //重定向的路由
    name: 'Material',  //路由名称
    meta: { title: '素材管理', icon: 'imgs' },
    children: [
      {
        path: 'materials',
        name: 'Materials',  //二级路由 设置名字最好带上一级路由的名字
        component: () => import('@/views/material/materials/index'),
        meta: { title: '图片列表', icon: 'imgs' }
      },
    ]
  },

  {
    path: '/article',  //路由路径
    component: Layout, //嵌入的父类模板
    redirect: '/article/articles',  //重定向的路由
    name: 'Material',  //路由名称
    meta: { title: '文章管理', icon: 'article' },
    children: [
      {
        path: 'articles',
        name: 'Articles',  //二级路由 设置名字最好带上一级路由的名字
        component: () => import('@/views/article/index'),
        meta: { title: '文章列表', icon: 'article'}
      },
    ]
  },

  {
    path: '/series',  //路由路径
    component: Layout, //嵌入的父类模板
    redirect: '/series/seriess',  //重定向的路由
    name: 'Series',  //路由名称
    meta: { title: '系列管理', icon: 'series' },
    children: [
      {
        path: 'seriess',
        name: 'Seriess',  //二级路由 设置名字最好带上一级路由的名字
        component: () => import('@/views/series/index'),
        meta: { title: '系列列表', icon: 'series'}
      },
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
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
