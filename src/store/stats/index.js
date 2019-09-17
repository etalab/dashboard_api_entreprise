import transform from "lodash/transform";
import cloneDeep from "lodash/cloneDeep";

const state = {
  apis_usage: {},
  last_calls: []
};

const getters = {
  lastTenMinutesNumberCalls(state) {
    if (state.apis_usage.last_10_minutes)
      return state.apis_usage.last_10_minutes.total;
    else return 0;
  },

  orderedApisUsage(state) {
    // order the list by number of call descending
    let apisUsage = cloneDeep(state.apis_usage);
    return transform(
      apisUsage,
      function(result, value, key) {
        value.by_endpoint.sort((e1, e2) => e2.total - e1.total);
        result[key] = value;
      },
      {}
    );
  },

  orderedLastCalls(state) {
    let logs = [...state.last_calls];
    // order last calls logs from newer to older
    return logs.sort(
      (log1, log2) => new Date(log2.timestamp) - new Date(log1.timestamp)
    );
  }
};

const mutations = {
  setApisUsage(state, apisUsage) {
    state.apis_usage = apisUsage;
  },

  setLastCalls(state, lastCalls) {
    state.last_calls = lastCalls;
  }
};

const actions = {
  fetch({ dispatch, commit }, { jti }) {
    const statsUrl = `/stats/jwt_usage/${jti}`;
    dispatch("api/watchdoge/get", { url: statsUrl }, { root: true }).then(
      data => {
        commit("setApisUsage", data.apis_usage);
        commit("setLastCalls", data.last_calls);
      }
    );
  }
};

export default {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};
