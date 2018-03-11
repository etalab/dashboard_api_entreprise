// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VeeValidate from 'vee-validate'
import router from './router'
import store from './store'

require('@/style/app.scss')
require('semantic-ui-menu/menu.min.css')
require('semantic-ui-tab/tab.min.css')
require('semantic-ui-tab/tab.min')

Vue.use(VeeValidate)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
