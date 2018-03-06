const state = {
  navigationMenu: {
    hidden: true
  }
}

const getters = {
  showNavigationMenu (state) {
    return !state.navigationMenu.hidden
  }
}

const mutations = {
  displayNavigationMenu (state, display) {
    state.navigationMenu.hidden = display
  },

  setAdminConfig (state) {
    // TODO use a merge method
    state.navigationMenu.hidden = false
  },

  setClientConfig (state) {
    state.navigationMenu.hidden = true
  }
}

const actions = {
  load ({ rootGetters, commit }) {
    if (rootGetters['auth/isAdmin']) commit('setAdminConfig')
    else commit('setClientConfig')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
