import orderBy from 'lodash/orderBy'

const state = {
  incidents: []
}

const getters = {
  orderedIndex (state) {
    return orderBy(state.incidents, ['created_at'], ['desc'])
  }
}

const mutations = {
  fill (state, { incidents }) {
    state.incidents = incidents
  },

  add (state, { incident }) {
    state.incidents.push(incident)
  }
}

const actions = {
  index ({ commit, dispatch }) {
    dispatch('api/admin/get', { url: '/incidents' }, { root: true })
      .then(data => commit('fill', { incidents: data }))
  },

  create ({ dispatch }, params) {
    return dispatch('api/admin/post', { url: '/incidents', params }, { root: true })
      .then(() => dispatch('index'))
  },

  update ({ dispatch }, { params, incidentId }) {
    return dispatch('api/admin/put', { url: `/incidents/${incidentId}`, params }, { root: true })
      .then(() => dispatch('index'))
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
