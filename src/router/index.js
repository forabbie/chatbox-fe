import { createRouter, createWebHistory } from 'vue-router'
import authRoutes from './routes/auth'
import workspaceRoutes from './routes/workspace'
// import settingsRoutes from "./routes/settings";

const Error403 = () => import(/* webpackChunkName: "pages-error403" */ '../views/Error403View.vue')
const Error404 = () => import(/* webpackChunkName: "pages-error404" */ '../views/Error404View.vue')
const Error500 = () => import(/* webpackChunkName: "pages-error500" */ '../views/Error500View.vue')

const routes = [
  { path: '/', redirect: { name: 'auth' } },
  ...authRoutes,
  ...workspaceRoutes,
  // ...settingsRoutes,
  // {
  //   name: 'channels',
  //   path: '/channels',
  //   component: () => import('@/views/ChannelView.vue'),
  //   meta: { layout: 'app', requiresAuth: true }
  // },
  {
    name: 'chat',
    path: '/chat',
    component: () => import('@/views/TestChatView.vue'),
    meta: { layout: 'app', requiresAuth: true }
  },
  {
    path: '/channel',
    name: 'channels',
    component: () => import('@/layouts/ChannelLayout.vue'),
    meta: { layout: 'app', requiresAuth: true },
    children: [
      {
        path: ':id',
        name: 'channel',
        component: () => import('@/views/channels/ChannelView.vue')
      },
      {
        path: 'no-channels',
        name: 'no-channels',
        component: () => import('@/views/channels/NoChannelsView.vue')
      }
    ]
  },
  {
    name: 'dms',
    path: '/dms',
    component: () => import('@/layouts/DmLayout.vue'),
    meta: { layout: 'app', requiresAuth: true },
    children: [
      {
        path: '',
        name: 'dm-layout',
        component: () => import('@/views/dms/DmView.vue'),
        children: [
          {
            path: ':id',
            name: 'dm',
            component: () => import('@/components/dms/DmMessages.vue')
          },
          {
            path: 'new',
            name: 'new-dm',
            component: () => import('@/components/dms/NewMessage.vue')
          }
        ]
      },
      // {
      //   path: 'new',
      //   name: 'new-dm',
      //   component: () => import('@/views/dms/NewDirectMessageView.vue')
      // },
      {
        path: 'no-dms',
        name: 'no-dms',
        component: () => import('@/views/dms/NoDmsView.vue')
      }
    ]
  },
  {
    path: '/pages/error403',
    name: 'error403',
    component: Error403,
    meta: { layout: 'auth' }
  },
  {
    path: '/pages/error404',
    name: 'error404',
    component: Error404,
    meta: { layout: 'auth' }
  },
  {
    path: '/pages/error500',
    name: 'error500',
    component: Error500,
    meta: { layout: 'auth' }
  },
  {
    // path: '/:catchAll(.*)',
    path: '/:pathMatch(.*)*',
    redirect: { name: 'error404' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { left: 0, top: 0 }
    }
  }
})

import { useLayoutStore } from '@/stores/layout.store'
import { useAuthStore } from '@/stores/auth.store'
import { useRouteStore } from '@/stores/route.store'

router.beforeResolve(async (to) => {
  const layoutStore = useLayoutStore()

  if (to.meta && to.meta.layout && to.meta.layout == 'auth') {
    layoutStore.setLayout('auth')
  } else {
    layoutStore.setLayout('app')
  }
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const routeStore = useRouteStore()
  routeStore.previousRoute = from

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'auth' })
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next({ name: 'channels' })
  } else {
    next()
  }
})

export default router
