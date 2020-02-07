import { filterListOfObjects } from "@/store/helpers";
import orderBy from "lodash/orderBy";

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

  userListFiltered(state) {
    if (state.search == "") return state.userIndex;

    return filterListOfObjects(
      state.userIndex,
      ["id", "email", "context"],
      state.search
    );
  },

  order(state) {
    return state.order;
  }
};

const mutations = {
  fill(state, users) {
    state.userIndex = users;
  },

  // Following mutations will need to be moved into an action when ordering
  // and filtering will be done serverside
  orderIndexBy(state, element) {
    // TODO Try to get rid off the order switch and memoization from the store
    // This may be moved in the component, object key and order passed to the
    // mutation when ordering changes. The behaviour could even be (maybe?)
    // shared into a component "table"'s mixin.
    const currentOrder = state.order[element];
    const newOrder = (state.order[element] =
      currentOrder == "desc" ? "asc" : "desc");
    state.userIndex = orderBy(state.userIndex, element, newOrder);
  },

  updateSearch(state, search) {
    state.search = search;
  }
};

const actions = {
  index({ commit, dispatch }) {
    dispatch("api/admin/get", { url: "/users" }, { root: true }).then(data => {
      // Default order: by most recent
      data = orderBy(data, "created_at", "desc");
      commit("fill", data);
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
