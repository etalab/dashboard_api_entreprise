import "es6-promise/auto";

import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import dashboard from "./dashboard";
import stats from "./stats";
import user from "./user";
import jwt_api_entreprise from "./jwt_api_entreprise";
import role from "./role";
import api from "./api";
import ui from "./ui";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  modules: {
    auth,
    ui,
    dashboard,
    stats,
    role,
    user,
    jwt_api_entreprise,
    api
  }
});
