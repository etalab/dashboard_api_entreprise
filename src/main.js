// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import VeeValidate from "vee-validate";
import VueClipboard from "vue-clipboard2";
import router from "./router";
import store from "./store";
import "babel-polyfill";
import Vuetify from "vuetify";

import "template.data.gouv.fr/dist/main.css";

require("@/polyfill");
require("@/style/app.scss");

Vue.use(VeeValidate);
Vue.use(VueClipboard);
Vue.config.productionTip = false;

Vue.use(Vuetify);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
