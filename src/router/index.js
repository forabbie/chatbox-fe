import { createRouter, createWebHistory } from 'vue-router'
import authRoutes from './routes/auth'
import workspaceRoutes from './routes/workspace'
// import settingsRoutes from "./routes/settings";
// import { useAuthStore } from '@/stores/auth.store'

const Error403 = () => import(/* webpackChunkName: "pages-error403" */ '../views/Error403View.vue')
const Error404 = () => import(/* webpackChunkName: "pages-error404" */ '../views/Error404View.vue')
const Error500 = () => import(/* webpackChunkName: "pages-error500" */ '../views/Error500View.vue')

const routes = [
  { path: '/', redirect: { name: 'auth' } },
  ...authRoutes,
  ...workspaceRoutes,
  // ...settingsRoutes,
  // {
  //   path: "/:pathMatch(.*)*",
  //   component: () => import("@/views/NotFoundView.vue"),
  // },
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
    path: '/:catchAll(.*)',
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

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'auth' })
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
