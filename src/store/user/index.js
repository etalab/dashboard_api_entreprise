import JwtDecode from "jwt-decode";
import userIndex from "./index/index.js";
import reduce from "lodash/reduce";
import cloneDeep from "lodash/cloneDeep";

const state = {
  user: {
    details: {},
    contacts: [],
    allowed_roles: [],
    tokens: [],
    blacklistedTokens: []
  }
};

const getters = {
  userDetails(state) {
    return state.user.details;
  },

  accountContacts(state) {
    return state.user.contacts;
  },

  anyContacts(state) {
    // Contacts, if exist, are grouped by "usage policy" (their related JWT id)
    const nbUsagePolicies = Object.keys(state.user.contacts).length;
    return nbUsagePolicies > 0;
  },

  tokens(state) {
    let tokens = cloneDeep(state.user.tokens);
    return tokens.sort(
      (token1, token2) =>
        new Date(token2.payload.iat) - new Date(token1.payload.iat)
    );
  },

  blacklistedTokens(state) {
    let blacklistedTokens = cloneDeep(state.user.blacklistedTokens);
    return blacklistedTokens.sort(
      (token1, token2) =>
        new Date(token2.payload.iat) - new Date(token1.payload.iat)
    );
  }
};

const formatJwt = (jwt, blacklisted) => {
  const payload = JwtDecode(jwt);

  return {
    blacklisted: blacklisted,
    value: jwt,
    payload
  };
};

const mutations = {
  setUserDetails(state, details) {
    state.user.details = details;
  },

  setContacts(state, contacts) {
    // As the name points is we are regrouping the received contact's data by
    // their related JWT. This is because we want to regroup contacts by their
    // token's usage policy (see issue #68).
    // Data received from API : [{id, email, phone_number, jwt_id, jwt_usage_policy, contact_type}, {...}]
    // Data grouped by JWT : { jwt_id: { usage_policy: jwt_usage_policy, contacts_data: [{ id, email, ...}, ...] }, jwt_id: { ...} }
    const jwtGroupedContacts = reduce(
      contacts,
      function(result, contact) {
        const relatedJwtId = contact.jwt_id;
        const relatedUsagePolicy = contact.jwt_usage_policy;
        const contact_data = {
          id: contact.id,
          email: contact.email,
          phone_number: contact.phone_number,
          contact_type: contact.contact_type
        };

        if (result[relatedJwtId] === undefined) {
          result[relatedJwtId] = {
            usage_policy: relatedUsagePolicy,
            contacts_data: []
          };
        }
        result[relatedJwtId].contacts_data.push(contact_data);
        return result;
      },
      {}
    );

    state.user.contacts = jwtGroupedContacts;
  },

  setTokens(state, tokens) {
    const decodedTokens = tokens.map(e => formatJwt(e, false));

    state.user.tokens = decodedTokens;
  },

  setBlacklistedTokens(state, blacklistedTokens) {
    const decodedTokens = blacklistedTokens.map(e => formatJwt(e, true));

    state.user.blacklistedTokens = decodedTokens;
  },

  setAllowedRoles(state, roles) {
    state.user.allowed_roles = roles;
  },

  addToken(state, token) {
    state.user.tokens.push(formatJwt(token, false));
  }
};

const actions = {
  get({ dispatch, rootGetters }, { userId } = {}) {
    const uid = userId || rootGetters["auth/currentUser"].id;
    dispatch("role/index", null, { root: true })
      .then(() =>
        dispatch("api/admin/get", { url: `/users/${uid}` }, { root: true })
      )
      .then(data => dispatch("fillUserData", data));
  },

  update({ dispatch }, { params, userId }) {
    return dispatch(
      "api/admin/put",
      { url: `/users/${userId}`, params },
      { root: true }
    ).then(() => dispatch("get", { userId }));
  },

  fillUserData({ commit }, data) {
    commit("setUserDetails", {
      id: data.id,
      email: data.email,
      context: data.context,
      note: data.note
    });

    commit("setContacts", data.contacts);
    commit("setTokens", data.tokens);
    commit("setBlacklistedTokens", data.blacklisted_tokens);
    commit("setAllowedRoles", data.allowed_roles);
  },

  createToken({ dispatch, getters }, payload) {
    const userId = getters.userDetails.id;
    //TODO not RESTFull here since a post on the resource URL is already
    //a "create" action. Authorizations (here checking this is an admin
    //making the request) needs to be done server side.
    //The URL should be /users/${userId}/jwt_api_entreprise
    let url = `/users/${userId}/jwt_api_entreprise`;

    dispatch(
      "api/admin/post",
      { url: url, params: payload },
      { root: true }
    ).then(() => dispatch("get", { userId }));
  },

  blacklistToken({ dispatch, getters }, payload) {
    const userId = getters.userDetails.id;
    let url = `users/${userId}/jwt_api_entreprise/blacklist`;
    dispatch(
      "api/admin/post",
      { url: url, params: payload },
      { root: true }
    ).then(() => dispatch("get", { userId }));
  },

  create({ dispatch }, payload) {
    return dispatch(
      "api/admin/post",
      { url: "/users", params: payload },
      { root: true }
    );
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
  modules: {
    index: userIndex
  }
};
