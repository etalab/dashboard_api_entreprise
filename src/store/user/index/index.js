const state = {
  user_index: []
};

const getters = {
  userList(state) {
    return state.user_index;
  }
};

const mutations = {
  fill(state, users) {
    state.user_index = users;
  }
};

const actions = {
  index({ commit, dispatch }) {
    dispatch("api/admin/get", { url: "/users" }, { root: true }).then(data =>
      commit("fill", data)
    );
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
