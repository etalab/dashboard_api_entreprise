import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import user from './user'
import role from './role'
import api from './api'
import ui from './ui'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    auth,
    ui,
    router,
    role,
    user,
    api
  }
})
