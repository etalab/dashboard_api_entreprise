const state = {
  roles: []
}

const getters = {
  index (state) {
    return state.roles
  }
}

const mutations = {
  fill (state, { roles }) {
    state.roles = roles
  },

  add (state, { role }) {
    state.roles.push(role)
  }
}

const actions = {
  index ({ commit, dispatch }) {
    dispatch('api/admin/get', { url: '/roles' }, { root: true })
      .then(data => commit('fill', { roles: data }))
  },

  create ({ dispatch }, params) {
    return dispatch('api/admin/post', { url: '/roles', params }, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
