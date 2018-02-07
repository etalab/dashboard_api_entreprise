import User from '@/models/User'
import * as MutationTypes from '@/store/mutation-types'

const state = {
  user: User.from(localStorage.token)
}

const getters = {
  currentUser (state) {
    return state.user
  },

  currentAdmin (state, getters) {
    let user = getters.currentUser
    if (user && user.isAdmin()) return user
    else return null
  }
}

const mutations = {
  [MutationTypes.LOGIN] (state) {
    state.user = User.from(localStorage.token)
  },
  [MutationTypes.LOGOUT] (state) {
    state.user = null
  }
}

const actions = {
  login ({ commit }, params) {
    localStorage.token = params.jwt_token
    commit(MutationTypes.LOGIN)
  },
  logout ({ commit }) {
    delete localStorage.token
    commit(MutationTypes.LOGOUT)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
