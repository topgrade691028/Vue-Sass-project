import Vue from 'vue'
import Router from 'vue-router'

import routes from './routes'
// import { getLogin, checkRouteAuth, checkRouteAdminRole, setRouteProps } from './middlewares'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: '/',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes
})

// router.beforeEach(getLogin)
// router.beforeEach(checkRouteAuth)
// router.beforeEach(checkRouteAdminRole)

// router.afterEach(setRouteProps)

export default router
