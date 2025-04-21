const dmsRoutes = [
  {
    name: 'dms',
    path: '/dms',
    component: () => import('@/views/DirectMessageView.vue'),
    meta: { layout: 'app', requiresAuth: true }
    // children: [
    //   {
    //     path: 'channel/:channelId',
    //     name: 'Channel',
    //     component: () => import('@/views/ChannelView.vue'),
    //     props: true // Pass route params as props
    //   },
    //   {
    //     path: '',
    //     redirect: 'channel/general' // Default channel
    //   }
    // ]
  }
]

export default dmsRoutes
