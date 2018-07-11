const state = {
  endpoints: [],
  homepageCode: 0,
  providersHistory: []
}

export const getters = {
  endpoints (state) { return state.endpoints },
  homepageCode (state) { return state.homepageCode },
  providersHistory (state) { return state.providersHistory }
}

export const mutations = {
  fillEndpoints (state, { endpoints }) {
    state.endpoints = endpoints
  },
  fillHomepageCode (state, { homepageCode }) {
    state.homepageCode = homepageCode
  },
  fillProvidersHistory (state, { providersHistory }) {
    state.providersHistory = providersHistory
  }
}

export const actions = {
  endpoints ({ dispatch, commit }) {
    dispatch('api/watchdoge/get', { url: '/dashboard/current_status' }, { root: true })
      .then(data => commit('fillEndpoints', { endpoints: data.results }))
      .catch(error => console.log(error))
  },
  homepageCode ({ dispatch, commit }) {
    dispatch('api/watchdoge/get', { url: '/dashboard/homepage_status' }, { root: true })
      .then(data => commit('fillHomepageCode', { homepageCode: data.results[0].code }))
      .catch(error => console.log(error))
  },
  providersHistory ({ dispatch, commit }) {
    dispatch('api/watchdoge/get', { url: '/dashboard/availability_history' }, { root: true })
      .then(data => commit('fillProvidersHistory', { providersHistory: data.results }))
      .catch(error => console.log(error))
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
