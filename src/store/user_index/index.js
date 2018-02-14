import * as MutationTypes from '@/store/mutation-types'
import axios from '@/axios-common'

const state = {
  user_index: []
}

const getters = {
  userList (state) {
    return state.user_index
  }
}

const mutations = {
  [MutationTypes.FETCH_USER_INDEX] (state) {
    axios.get('/users')
      .then(response => {
        state.user_index = response.data
      })
  }
}

const actions = {
  fetch_user_index ({ commit }) {
    commit(MutationTypes.FETCH_USER_INDEX)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
