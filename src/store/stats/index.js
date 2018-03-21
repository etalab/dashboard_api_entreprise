const state = {
  last_calls: [
    {
      url: '/entreprises',
      params: {
        siren: '172876520'
      },
      code: 200
    },
    {
      url: '/etablissements',
      params: {
        siren: '122096842'
      },
      code: 404
    }
  ],
  http_code_percentages: {
    last_8_days: [
      {
        '200': 59.79341443467897
      },
      {
        '404': 12.39604821049336
      },
      {
        '500': 0.002459757045369937
      }
    ]
  },
  number_of_calls: {
    last_10_minutes: {
      total: 25092756,
      by_endpoints: [
        {
          uname: 'INSEE Entreprise',
          name: 'entreprises',
          total: 31593418
        },
        {
          uname: 'INSEE Etablissement',
          name: 'etablissement',
          total: 90405849
        }
      ]
    },
    last_30_hours: {
      total: 51340777,
      by_endpoints: [
        {
          uname: 'Associations',
          name: 'associations',
          total: 96718491
        },
        {
          uname: 'Attestations fiscales DGFIP',
          name: 'attestations fiscales',
          total: 98043402
        },
        {
          uname: 'INSEE Entreprise',
          name: 'entreprises',
          total: 44508948
        },
        {
          uname: 'Attestations PROBTP',
          name: 'probtp',
          total: 69595487
        }
      ]
    },
    last_8_days: {
      total: 12018911,
      by_endpoints: [
        {
          uname: 'Attestation AGEFIPH',
          name: 'agefiph',
          total: 44072757
        },
        {
          uname: 'Carte PRO FNTP',
          name: 'fntp',
          total: 95482815
        }
      ]
    }
  }
}

const getters = {
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
  }
}

const mutations = {
  setJwtStats (state, stats) {
    state = stats
  }
}

const actions = {
  fetch ({ dispatch, commit }, { jti }) {
    const statsUrl = `/stats/jwt_usage/${jti}`
    dispatch('api/watchdoge/get', { url: statsUrl }, { root: true })
      .then(data => commit('setJwtStats', data))
  }
}

export default {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}
