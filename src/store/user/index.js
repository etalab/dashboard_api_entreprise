import JwtDecode from 'jwt-decode'
import userCreate from './create'

const state = {
  user: {
    details: {},
    contacts: [],
    tokens: []
  }
}

const getters = {
  user (state) {
    return state.user.details
  },

  contacts (state) {
    return state.user.contacts
  },

  tokens (state) {
    return state.user.tokens
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
    const decodedTokens = tokens.map(jwt => {
      const payload = JwtDecode(jwt)

      return {
        value: jwt,
        payload
      }
    })

    state.user.tokens = decodedTokens
  }
}

const actions = {
  get ({ dispatch, commit, rootGetters }, { userId } = {}) {
    const uid = userId || rootGetters.currentUser.id
    dispatch('api/get', { url: `/users/${uid}` }, { root: true })
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
  modules: {
    create: userCreate
  }
}
