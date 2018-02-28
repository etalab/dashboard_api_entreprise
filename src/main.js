// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VeeValidate from 'vee-validate'
import router from './router'
import axios from './axios-common'
import store from './store'

require('@/style/app.scss')

Vue.use(VeeValidate)
Vue.config.productionTip = false

// $http is now available from anywhere in the app
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
