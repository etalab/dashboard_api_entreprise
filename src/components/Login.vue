<template lang="pug">
div
  h4 Administration API Entreprise

  v-alert(
    color="error"
    icon="warning"
    dismissible
    v-model="loginError"
    ) Login failed!

  form
    v-text-field(
      label="E-mail"
      v-model="email"
      :error-messages="errors.collect('email')"
      v-validate="'required|email'"
      data-vv-name="email"
      required)

    v-text-field(
      label="Mot de passe"
      v-model="password"
      :error-messages="errors.collect('password')"
      v-validate="'required'"
      data-vv-name="password"
      type="password"
      required)

    v-btn(@click="login") Connexion
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: '',
      loginError: false
    }
  },

  // redirect to '/users' when already logged in
  created () {
    this.checkLoggedIn()
  },

  updated () {
    this.checkLoggedIn()
  },

  computed: {
    ...mapGetters(['currentUser'])
  },

  methods: {
    login: function () {
      this.$validator.validateAll()
        .then(result => {
          if (result) {
            this.$http.post('/users/login', {
              username: this.email,
              password: this.password,
              grant_type: 'password'
            })
              .then(response => this.successLogin(response))
              .catch(() => this.failLogin())
          }
        })
    },

    successLogin: function (response) {
      if (!response.data.access_token) {
        this.failLogin()
        return
      }

      localStorage.token = response.data.access_token
      this.loginError = false
      this.$store.dispatch('login')
      this.$router.replace(this.$route.query.redirect || { name: 'users' })
    },

    failLogin () {
      this.loginError = true
      this.$store.dispatch('logout')
      delete localStorage.token
    },

    checkLoggedIn () {
      if (this.currentUser) {
        this.$router.replace(this.$route.query.redirect || { name: 'users' })
      }
    }
  }
}
</script>
