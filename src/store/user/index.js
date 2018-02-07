import * as MutationTypes from '@/store/mutation-types'
import axios from '@/axios-common'

const state = {
  user: {}
}

const getters = {
  userId (state) {
    return state.user.id
  },

  userEmail (state) {
    return state.user.email
  },

  userContext (state) {
    return state.user.context
  },

  userContacts (state) {
    return state.user.contacts
  },

  userTokens (state) {
    return state.user.tokens
  }
}

const mutations = {
  // Fetch user data from API
  [MutationTypes.FETCH_USER] (state, uid) {
    axios.get(`/users/${uid}`)
      .then(response => {
        state.user = response.data
      })
      .catch(response => {
        // TODO error handling
        state.user = {}
      })
  }
}

const actions = {
  fetch_user ({ commit, getters }, { uid } = {}) {
    const userId = uid || getters.currentUser.id
    commit(MutationTypes.FETCH_USER, userId)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
