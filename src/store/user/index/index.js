import orderBy from "lodash/orderBy";
import { sanitizeNulls } from "@/components/mixins/data";

const state = {
  userIndex: [],
  search: "",
  order: {
    created_at: "desc",
    email: "asc",
    context: "asc",
    confirmed: "asc"
  }
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
  },

  order(state) {
    return state.order;
  }
};

const mutations = {
  fill(state, users) {
    state.userIndex = users;
  },

  toggleOrder(state, element) {
    if (state.order[element] == "desc") {
      state.order[element] = "asc";
    } else if (state.order[element] == "asc") {
      state.order[element] = "desc";
    }
  },

  orderIndexBy(state, { element, order }) {
    state.userIndex = orderBy(state.userIndex, element, order);
  },

  updateSearch(state, search) {
    state.search = search;
  }
};

const actions = {
  index({ commit, dispatch }) {
    dispatch("api/admin/get", { url: "/users" }, { root: true }).then(data => {
      sanitizeNulls(data);
      // Default order: by most recent
      data = orderBy(data, "created_at", "desc");
      commit("fill", data);
    });
  },

  toggleSort({ commit }, element) {
    commit("toggleOrder", element);
    commit("orderIndexBy", {
      element: element,
      order: state.order[element]
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
