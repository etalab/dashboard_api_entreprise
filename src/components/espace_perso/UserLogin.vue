<template lang="pug">
  .login
    nav-bar
    .container
      .form__container
        form.panel
          h1 Bienvenue sur votre espace client

          .form__group
            label Adresse e-mail
            input(type="email" v-model="email")

          .form__group
            label Mot de passe
            input(type="password" v-model="password")
            small
              a Mot de passe oublié ?

          button.button(@click="submitLogin") S'identifier

          .signup.text-center Pas de compte ?
            div
              a Contactez-nous &nbsp
              span pour en créer un.

</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from '@/components/layout/Navbar'

export default {
  name: 'user-login',

  data () {
    return {
      email: '',
      password: ''
    }
  },

  // redirect to /account/ when user already logged in
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
    submitLogin () {
      this.$http.post('/users/login', {
        username: this.email,
        password: this.password,
        grant_type: 'password'
      })
        .then(response => this.successLogin(response.data))
        .catch(response => this.failLogin())
    },

    successLogin (responseData) {
      if (!responseData.access_token) {
        this.failLogin()
        return
      }
      this.loginError = false

      this.$store.dispatch('login', { jwt_token: responseData.access_token })
        .then(() => {
          // Update default axios header
          // TODO Move global axios instance into the store
          this.$http.defaults.headers['Authorization'] = 'Bearer ' + localStorage.token
          this.$router.replace(this.$route.query.redirect || { name: 'user-dashboard' })
        })
    },

    failLogin () {
      this.loginError = true
      this.$store.dispatch('logout')
    },

    checkLoggedIn () {
      if (this.currentUser) {
        this.$router.replace(this.$route.query.redirect || { name: 'user-dashboard' })
      }
    }
  },

  components: {
    'nav-bar': Navbar
  }
}
</script>

<style lang="scss" scoped>
  .login {
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
  }

  button.button {
    margin-top: 2em;
    display: block;
  }

  .signup {
    margin-top: 2em;
  }
</style>
