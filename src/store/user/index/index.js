import { orderBy } from "lodash";

const state = {
  userIndex: [],
  search: ""
};

const getters = {
  search(state) {
    return state.search;
  },
  userList(state) {
    return state.userIndex;
  },
  userListFiltered(state, getters) {
    if (state.search == "") {
      return getters.userList;
    }

    // Removing special chars from regexp to match litteral string
    const regex = new RegExp(
      state.search.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"),
      "gi"
    );

    return state.userIndex.filter(item => {
      return (
        item.id.match(regex) ||
        item.context.match(regex) ||
        item.email.match(regex)
      );
    });
  }
};

const mutations = {
  fill(state, users) {
    state.userIndex = users;
  },
  orderIndexBy(state, { element, direction }) {
    state.userIndex = orderBy(state.userIndex, element, direction);
  },
  updateSearch(state, search) {
    state.search = search;
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
