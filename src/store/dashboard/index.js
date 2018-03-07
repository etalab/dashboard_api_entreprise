import axios from 'axios'

const API_URL = `${process.env.API_BASE_URL}${process.env.DASHBOARD_URL_PREFIX}`

const http = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000
})

const state = {
  endpoints: [],
  homepageCode: 500,
  endpointsHistory: []
}

export const getters = {
  endpoints (state) { return state.endpoints },
  homepageCode (state) { return state.homepageCode },
  endpointsHistory (state) { return state.endpointsHistory }
}

export const mutations = {
  fillEndpoints (state, { endpoints }) {
    state.endpoints = endpoints
  },
  fillHomepageCode (state, { homepageCode }) {
    state.homepageCode = homepageCode
  },
  fillEndpointsHistory (state, { endpointsHistory }) {
    state.endpointsHistory = endpointsHistory
  }
}

export const actions = {
  endpoints ({ commit }) {
    return http.get('/current_status')
      .then(response => commit('fillEndpoints', { endpoints: response.results }))
      .catch(error => console.log(error))
  },
  homepageCode ({ commit }) {
    return http.get('/homepage_status')
      .then(response => commit('fillHomepageCode', { homepageCode: response.results[0].code }))
      .catch(error => console.log(error))
  },
  endpointsHistory ({ commit }) {
    return http.get('/availability_history')
      .then(response => commit('fillEndpointsHistory', { endpointsHistory: response.results }))
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
