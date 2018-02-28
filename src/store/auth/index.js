import User from '@/models/User'

const state = {
  // TODO remove user model
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
  setAuthenticatedUser (state) {
    state.user = User.from(localStorage.token)
  },

  clearUser (state) {
    state.user = null
  }
}

const actions = {
  login ({ dispatch, commit }, params) {
    return dispatch('api/admin/post', { url: '/users/login', params: params }, { root: true })
      .then(data => {
        const sessionJWT = data.access_token
        if (!sessionJWT) dispatch('logout')
        else dispatch('loginSuccess', sessionJWT)
      })
  },

  logout ({ commit }) {
    delete localStorage.token
    commit('clearUser')
  },

  loginSuccess ({ dispatch, commit, rootGetters }, jwt) {
    localStorage.token = jwt
    commit('setAuthenticatedUser')
    return dispatch('api/admin/updateAuthorizationBearer', { root: true })
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
