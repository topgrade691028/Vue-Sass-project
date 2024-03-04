import Vue from 'vue'
import Vuex from 'vuex'

import teams from './modules/teams'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    teams
  },
  strict: process.env.NODE_ENV === 'development'
})
