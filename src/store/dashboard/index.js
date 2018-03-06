const state = {
  realTime: {},
  history: {}
}

const getters = {
  realTime (state) { return state.realTime },
  history (state) { return state.history }
}

const mutations = {
  fillRealTime (state, { realTime }) {
    state.realTime = realTime
  }
}

const actions = {
  realTime ({ commit, dispatch }) {
    dispatch('api/watchdoge/get', { url: '/current_status' }, { root: true })
      .then(data => commit('fillRealTime', { realTime: data }))
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
