import JwtDecode from 'jwt-decode'
import userCreate from './create'
import userIndex from './index/index.js'

const state = {
  user: {
    details: {},
    contacts: [],
    tokens: []
  }
}

const getters = {
  userDetails (state) {
    return state.user.details
  },

  contacts (state) {
    return state.user.contacts
  },

  tokens (state) {
    return state.user.tokens
  }
}

const formatJwt = (jwt) => {
  const payload = JwtDecode(jwt)

  return {
    value: jwt,
    payload
  }
}

const mutations = {
  setUserDetails (state, details) {
    state.user.details = details
  },

  setContacts (state, contacts) {
    state.user.contacts = contacts
  },

  setTokens (state, tokens) {
    const decodedTokens = tokens.map(e => formatJwt(e))

    state.user.tokens = decodedTokens
  },

  addToken (state, token) {
    state.user.tokens.push(formatJwt(token))
  }
}

const actions = {
  get ({ dispatch, commit, rootGetters }, { userId } = {}) {
    const uid = userId || rootGetters['auth/currentUser'].id
    dispatch('api/admin/get', { url: `/users/${uid}` }, { root: true })
      .then(data => dispatch('fillUserData', data))
  },

  fillUserData ({ commit }, data) {
    commit('setUserDetails', {
      id: data.id,
      email: data.email,
      context: data.context
    })

    commit('setContacts', data.contacts)
    commit('setTokens', data.tokens)
  },

  createToken ({ dispatch, commit, getters }, payload) {
    const userId = getters.userDetails.id
    const url = `/users/${userId}/jwt_api_entreprise`
    dispatch('api/admin/post', { url: url, params: payload }, { root: true })
      .then(data => commit('addToken', data.new_token))
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
  modules: {
    create: userCreate,
    index: userIndex
  }
}
