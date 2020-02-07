import orderBy from "lodash/orderBy";

const state = {
  tokens: [],
  search: "",
  order: {
    iat: "desc",
    subject: "asc",
    exp: "desc",
    archived: "asc",
    blacklisted: "asc"
  }
};

const getters = {
  search(state) {
    return state.search;
  },

  tokenList(state) {
    return state.tokens;
  },

  tokenListFiltered(state) {
    if (state.search == "") {
      return state.tokens;
    }

    // Removing special chars from regexp to match litteral string
    const regex = new RegExp(
      state.search.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"),
      "gi"
    );

    return state.tokens.filter(item => {
      let keepItem = false;
      ["id", "subject"].forEach(k => {
        if (item[k] !== null && item[k].match(regex)) keepItem = true;
      });

      return keepItem;
    });
  },

  order(state) {
    return state.order;
  }
};

const mutations = {
  fill(state, token_list) {
    state.tokens = token_list;
  },

  toggleOrder(state, element) {
    if (state.order[element] == "desc") {
      state.order[element] = "asc";
    } else if (state.order[element] == "asc") {
      state.order[element] = "desc";
    }
  },

  orderIndexBy(state, { element, order }) {
    state.tokens = orderBy(state.tokens, element, order);
  },

  updateSearch(state, search) {
    state.search = search;
  }
};

const actions = {
  index({ commit, dispatch }) {
    dispatch(
      "api/admin/get",
      { url: "/jwt_api_entreprise" },
      { root: true }
    ).then(data => {
      // Default order: by most recent
      commit("fill", orderBy(data, "iat", "desc"));
    });
  },

  // TODO XXX Move into a mutation, action not needed here
  // Only one mutation needed too
  // Create a "mixin" or a generic component to share table ordering and filtering
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
