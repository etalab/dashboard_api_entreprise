const state = {
  number_of_calls: {},
  last_calls: [],
  http_ratios: {}
}

const getters = {
  lastTenMinutesNumberCalls (state) {
    if (state.number_of_calls.last_10_minutes) return state.number_of_calls.last_10_minutes.total
    else return 0
  },

  endpointsCalled (state) {
    return state.number_of_calls
  },

  responseCodeRatio (state) {
    return state.http_ratios
  },

  lastTenMinutesCalls (state) {
    return state.number_of_calls.last_10_minutes
  },

  lastThirtyHoursCalls (state) {
    return state.number_of_calls.last_30_hours
  },

  lastEightDaysCalls (state) {
    return state.number_of_calls.last_8_days
  },

  lastCalls (state) {
    return state.last_calls
  },

  orderedLastCalls (state, getters) {
    let logs = [...state.last_calls]
    return logs.sort((log1, log2) => new Date(log2.timestamp) - new Date(log1.timestamp))
  }
}

const mutations = {
  setNumberCalls (state, nbCalls) {
    state.number_of_calls = nbCalls
  },

  setLastCalls (state, lastCalls) {
    state.last_calls = lastCalls
  },

  setResponseCodeRatios (state, ratios) {
    state.http_ratios = ratios
  }
}

const actions = {
  fetch ({ dispatch, commit }, { jti }) {
    const statsUrl = `/stats/jwt_usage/${jti}`
    dispatch('api/watchdoge/get', { url: statsUrl }, { root: true })
      .then(data => {
        commit('setNumberCalls', data.number_of_calls)
        commit('setLastCalls', data.last_calls)
        commit('setResponseCodeRatios', data.http_code_percentages)
      })
  }
}

export default {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}
