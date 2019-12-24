import User from "@/models/User";

const state = {
  // TODO remove user model
  user: User.from(localStorage.token)
};

const getters = {
  unknownUser(state, getters) {
    return getters.currentUser === null;
  },

  currentUser(state) {
    return state.user;
  },

  isAdmin(_state, getters) {
    const user = getters.currentUser;
    return user && user.isAdmin();
  }
};

const mutations = {
  setAuthenticatedUser(state) {
    state.user = User.from(localStorage.token);
  },

  clearUser(state) {
    state.user = null;
  }
};

const actions = {
  login({ dispatch }, params) {
    return dispatch(
      "api/admin/post",
      { url: "/users/login", params: params },
      { root: true }
    ).then(data => dispatch("processLogin", data));
  },

  logout({ commit }) {
    delete localStorage.token;
    commit("clearUser");
  },

  loginSuccess({ dispatch, commit }, jwt) {
    localStorage.token = jwt;
    commit("setAuthenticatedUser");
    return dispatch("api/admin/updateAuthorizationBearer", null, {
      root: true
    });
  },

  processLogin({ dispatch }, response) {
    const sessionJWT = response.access_token;
    if (!sessionJWT) dispatch("logout");
    else dispatch("loginSuccess", sessionJWT);
  },

  confirm({ dispatch }, params) {
    return dispatch(
      "api/admin/post",
      { url: "/users/confirm", params: params },
      { root: true }
    ).then(data => dispatch("processLogin", data));
  },

  passwordResetRequest({ dispatch }, params) {
    return dispatch(
      "api/admin/post",
      { url: "/users/password_renewal", params: params },
      { root: true }
    );
  },

  passwordReset({ dispatch }, params) {
    return dispatch(
      "api/admin/post",
      { url: "/users/password_reset", params: params },
      { root: true }
    ).then(data => dispatch("processLogin", data));
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
