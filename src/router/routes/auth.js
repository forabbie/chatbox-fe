const authRoutes = [
  {
    path: '/auth',
    name: 'Auth',
    redirect: { name: 'login' },
    component: () => import('@/views/AuthView.vue'),
    meta: { layout: 'auth', requiresGuest: true },
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/components/auth/LoginForm.vue'),
        props: true // Pass route params as props
      },
      {
        path: 'signup',
        name: 'signup',
        component: () => import('@/components/auth/RegisterForm.vue'),
        props: true // Pass route params as props
      }
    ]
  }
]

export default authRoutes
