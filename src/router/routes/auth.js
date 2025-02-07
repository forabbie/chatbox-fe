const authRoutes = [
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/views/AuthView.vue'),
    meta: { layout: 'auth', requiresGuest: true }
  }
]

export default authRoutes
