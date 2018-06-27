const state = {
  incidents: []
}

const getters = {
  index (state) {
    return state.incidents
  }
}

const mutations = {
  fill (state, { incidents }) {
    state.incidents = incidents
  },

  add (state, { incident }) {
    state.incidents.push(incident)
  }
}

const actions = {
  index ({ commit, dispatch }) {
    dispatch('api/admin/get', { url: '/incidents' }, { root: true })
      .then(data => commit('fill', { incidents: data }))
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
