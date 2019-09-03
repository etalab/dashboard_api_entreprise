import axios from "axios";
import router from "@/router";

const API_URL = `${process.env.VUE_APP_ADMIN_API_BASE_URL}${
  process.env.VUE_APP_ADMIN_URL_PREFIX
}`;

const http = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token")
  },
  timeout: 30000
});

const actions = {
  get(ctx, { url, params = {} }) {
    return new Promise((resolve, reject) => {
      http
        .get(url, { params })
        .then(response => resolve(response.data))
        .catch(error => reject(handleError(error)));
    });
  },

  post(ctx, { url, params = {} }) {
    return new Promise((resolve, reject) => {
      http
        .post(url, params)
        .then(response => resolve(response.data))
        .catch(error => reject(handleError(error)));
    });
  },

  put(ctx, { url, params = {} }) {
    return new Promise((resolve, reject) => {
      http
        .put(url, params)
        .then(response => resolve(response.data))
        .catch(error => reject(handleError(error)));
    });
  },

  updateAuthorizationBearer(ctx) {
    http.defaults.headers["Authorization"] = "Bearer " + localStorage.token;
  }
};

const handleError = error => {
  // TODO handle error message with vuex
  if (!error.response) router.push({ name: "logout" });
  else if (error.response.status === 401) router.push({ name: "logout" });
  else if (error.response.status === 422) return error.response.data.errors;
};

export default { namespaced: true, actions };
