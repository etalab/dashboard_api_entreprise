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
  endpoints ({ commit }) {
    return http.get('/current_status')
      .then(response => commit('fillEndpoints', { endpoints: response.data.results }))
      .catch(error => console.log(error))
  },
  homepageCode ({ commit }) {
    return http.get('/homepage_status')
      .then(response => commit('fillHomepageCode', {homepageCode: response.data.results[0].code}))
      .catch(error => console.log(error))
  },
  providersHistory ({ commit }) {
    return http.get('/availability_history')
      .then(response => commit('fillProvidersHistory', { providersHistory: response.data.results }))
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
