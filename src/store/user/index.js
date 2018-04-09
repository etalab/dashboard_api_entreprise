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

  fillUserData ({ commit }, data) {
    commit('setUserDetails', {
      id: data.id,
      email: data.email,
      context: data.context,
      allow_token_creation: data.allow_token_creation
    })

    commit('setContacts', data.contacts)
    commit('setTokens', data.tokens)
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
