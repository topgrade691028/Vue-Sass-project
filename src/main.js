import './scss/main.scss'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'

import './globalComponents'

Vue.config.productionTip = process.env.NODE_ENV === 'production'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('body')

if (process.env.VUE_APP_SENTRY_DSN && process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: process.env.VUE_APP_SENTRY_DSN,
    integrations: [new Integrations.Vue({ Vue, attachProps: true })]
  })
}
