export default [
  {
    path: '/',
    component: () => import(/* webpackChunkName: 'home' */ '@/views/Home'),
    meta: {
      title: 'Home'
    }
  },
  {
    path: '*',
    component: () => import(/* webpackChunkName: 'error' */ '@/views/Error.vue'),
    meta: {
      title: 'Error'
    }
  }
]
