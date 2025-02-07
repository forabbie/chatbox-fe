import { createRouter, createWebHistory } from 'vue-router'
import authRoutes from './routes/auth'
// import workspaceRoutes from "./routes/workspace";
// import settingsRoutes from "./routes/settings";
// import { useAuthStore } from '@/stores/auth.store'

const Error403 = () => import(/* webpackChunkName: "pages-error403" */ '../views/Error403View.vue')
const Error404 = () => import(/* webpackChunkName: "pages-error404" */ '../views/Error404View.vue')
const Error500 = () => import(/* webpackChunkName: "pages-error500" */ '../views/Error500View.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: { name: 'Auth' } },
    ...authRoutes,
    // ...workspaceRoutes,
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
})

// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore();
//   if (to.meta.requiresAuth && !authStore.isAuthenticated) {
//     next({ name: "Auth" });
//   } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
//     next({ name: "Home" });
//   } else {
//     next();
//   }
// });

import { useLayoutStore } from '@/stores/layout.store'

router.beforeResolve(async (to) => {
  const layoutStore = useLayoutStore()

  if (to.meta && to.meta.layout && to.meta.layout == 'auth') {
    layoutStore.setLayout('auth')
  } else {
    layoutStore.setLayout('app')
  }
})
export default router
