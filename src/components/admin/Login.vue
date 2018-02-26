<template lang="pug">
div
  v-app
    v-container(fill-height)
      v-layout(row wrap align-center)
        v-flex(sm6 offset-sm3)
          v-card
            v-card-text
              h3 Login

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

  // redirect to '/users' when admin already logged in
  created () {
    this.checkLoggedIn()
  },

  updated () {
    this.checkLoggedIn()
  },

  computed: {
    ...mapGetters(['currentAdmin'])
  },

  methods: {
    login: function () {
      this.$validator.validateAll()
        .then(result => {
          if (result) {
            const loginParams = {
              username: this.email,
              password: this.password,
              grant_type: 'password'
            }
            this.$store.dispatch('login', loginParams)
              .then(() => {
                this.$router.push(this.$route.query.redirect || { name: 'users' })
              })
              .catch(() => {
                this.loginError = true
              })
          }
        })
    },

    checkLoggedIn () {
      if (this.currentAdmin) {
        this.$router.replace(this.$route.query.redirect || { name: 'users' })
      }
    }
  }
}
</script>
