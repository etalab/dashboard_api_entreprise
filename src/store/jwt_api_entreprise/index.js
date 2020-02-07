import { filterListOfObjects } from "@/store/helpers";
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
    if (state.search == "") return state.tokens;

    return filterListOfObjects(state.tokens, ["id", "subject"], state.search);
  },

  order(state) {
    return state.order;
  }
};

const mutations = {
  fill(state, token_list) {
    state.tokens = token_list;
  },

  orderIndexBy(state, element) {
    const currentOrder = state.order[element];
    const newOrder = (state.order[element] =
      currentOrder == "desc" ? "asc" : "desc");
    state.tokens = orderBy(state.tokens, element, newOrder);
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
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
