import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import user from './user'
import layoutContent from './layout_content'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    layoutContent,
    user
  }
})
