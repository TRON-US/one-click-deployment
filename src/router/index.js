import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
// import Layout from '@/layout'
import Layout from '@/newLayout';
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
export const constantRoutes = [{
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
      meta: {
        title: '一键部署系统',
        icon: 'dashboard'
      }
    }]
  },

  {
    path: '/branch',
    component: Layout,
    redirect: '/branch/list',
    name: 'branch',
    meta: {
      title: '分支',
      icon: 'example'
    },
    children: [{
      path: 'list',
      name: 'list',
      component: () => import('@/views/branch/index'),
      meta: {
        title: '分支管理',
        icon: 'table'
      }
    }]
  },
  {
    path: '/setting',
    component: Layout,
    redirect: '/setting/list',
    name: 'setting',
    meta: {
      title: '配置',
      icon: 'example'
    },
    children: [{
      path: 'list',
      name: 'settinglist',
      component: () => import('@/views/setting/index'),
      meta: {
        title: '配置管理',
        icon: 'setting'
      }
    }]
  },

  {
    path: '/node',
    component: Layout,
    redirect: '/node/list',
    name: 'Example',
    meta: {
      title: '节点',
      icon: 'example'
    },
    children: [{
        path: 'table',
        name: 'table',
        component: () => import('@/views/node/index'),
        meta: {
          title: '节点管理',
          icon: 'table'
        }
      },
      // {
      //   path: 'status',
      //   name: 'status',
      //   component: () => import('@/views/node/status'),
      //   meta: {
      //     title: '节点状态',
      //     icon: 'tree'
      //   }
      // },
      // {
      //   path: 'detail',
      //   name: 'detail',
      //   component: () => import('@/views/node/nodeDetail'),
      //   meta: {
      //     title: '节点详情',
      //     icon: 'detail'
      //   }
      // }
    ]
  },

  {
    path: '/plugin',
    component: Layout,
    redirect: '/plugin/list',
    name: 'plugin',
    meta: {
      title: '插件管理',
      icon: 'example'
    },
    children: [{
      path: 'list',
      name: 'pluginlist',
      component: () => import('@/views/pluginList/index'),
      meta: {
        title: '导入插件',
        icon: 'table'
      }
    }]
  },

  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
