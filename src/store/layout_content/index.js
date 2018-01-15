import * as MutationTypes from '@/store/mutation-types'

const state = {
  pageTitle: ''
}

const getters = {
  currentTitle (state) {
    return state.pageTitle
  }
}

const mutations = {
  [MutationTypes.SET_PAGE_TITLE] (state, title) {
    state.pageTitle = title
  }
}

const actions = {
  setPageTitle ({ commit }, title) {
    commit(MutationTypes.SET_PAGE_TITLE, title)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
