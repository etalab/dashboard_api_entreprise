import JwtDecode from 'jwt-decode'
import userCreate from './create'
import userIndex from './index/index.js'
import orderBy from 'lodash/orderBy'
import cloneDeep from 'lodash/cloneDeep'

const state = {
  user: {
    details: {},
    contacts: [],
    allowed_roles: [],
    tokens: [],
    disabledTokens: []
  }
}

const getters = {
  userDetails (state) {
    return state.user.details
  },

  accountContacts (state) {
    return state.user.contacts.filter(contact => ['tech', 'admin'].includes(contact.contact_type))
  },

  tokenContacts (state) {
    return state.user.contacts.filter(contact => contact.contact_type === 'token')
  },

  tokens (state) {
    let tokens = cloneDeep(state.user.tokens)
    return tokens.sort((token1, token2) => new Date(token2.payload.iat) - new Date(token1.payload.iat))
  },

  disabledTokens (state) {
    let disabledTokens = cloneDeep(state.user.disabledTokens)
    return disabledTokens.sort((token1, token2) => new Date(token2.payload.iat) - new Date(token1.payload.iat))
  },

  allowedRoles (state, getters, rootState, rootGetters) {
    const allRoles = cloneDeep(rootGetters['role/index'])
    const taggedRoles = allRoles.map(role => {
      role.allowed = (state.user.allowed_roles.includes(role.code))
      return role
    })

    return orderBy(taggedRoles, ['allowed', 'name'], ['desc', 'asc'])
  },

  allowedToCreateToken (state) {
    return state.user.details.allow_token_creation
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

  setDisabledTokens (state, disabledTokens) {
    const decodedTokens = disabledTokens.map(e => formatJwt(e))

    state.user.disabledTokens = decodedTokens
  },

  setAllowedRoles (state, roles) {
    state.user.allowed_roles = roles
  },

  addToken (state, token) {
    state.user.tokens.push(formatJwt(token))
  }
}

const actions = {
  get ({ dispatch, commit, rootGetters }, { userId } = {}) {
    const uid = userId || rootGetters['auth/currentUser'].id
    dispatch('role/index', null, { root: true })
      .then(() => dispatch('api/admin/get', { url: `/users/${uid}` }, { root: true }))
      .then(data => dispatch('fillUserData', data))
  },

  update ({ dispatch }, { params, userId }) {
    return dispatch('api/admin/put', { url: `/users/${userId}`, params }, { root: true })
      .then(() => dispatch('get', { userId }))
  },

  fillUserData ({ commit }, data) {
    commit('setUserDetails', {
      id: data.id,
      email: data.email,
      context: data.context,
      note: data.note,
      allow_token_creation: data.allow_token_creation
    })

    commit('setContacts', data.contacts)
    commit('setTokens', data.tokens)
    commit('setDisabledTokens', data.disabled_tokens)
    commit('setAllowedRoles', data.allowed_roles)
  },

  createToken ({ dispatch, commit, getters, rootGetters }, payload) {
    const userId = getters.userDetails.id
    let url = ''
    if (rootGetters['auth/isAdmin']) {
      url = `/users/${userId}/jwt_api_entreprise/admin_create`
    } else {
      url = `/users/${userId}/jwt_api_entreprise`
    }

    dispatch('api/admin/post', { url: url, params: payload }, { root: true })
      .then(data => commit('addToken', data.new_token))
  },

  disableToken ({ dispatch, commit, getters, rootGetters }, payload) {
    const userId = getters.userDetails.id
    let url = `users/${userId}/jwt_api_entreprise/disable`
    dispatch('api/admin/post', { url: url, params: payload }, { root: true })
      .then(data => dispatch('get', { userId }))
  },

  addRoles ({ dispatch, getters }, roles) {
    const userId = getters.userDetails.id
    dispatch('api/admin/post', { url: `/users/${userId}/add_roles`, params: roles }, { root: true })
      .then(data => dispatch('user/get', { userId }))
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
