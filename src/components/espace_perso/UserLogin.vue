<template lang="pug">
  .login
    .container
      .form__container
        form.panel
          h1 Veuillez vous authentifier

          v-alert(
            color="error"
            icon="warning"
            dismissible
            v-model="loginError"
            ) Login failed!

          .form__group
            label Adresse e-mail
            input(type="email" v-model="email")

          .form__group
            label Mot de passe
            input(type="password" v-model="password")
            small
              a Mot de passe oublié ?

          button.button(@click="login") S'identifier

          .signup.text-center Pas de compte ?
            div
              a Contactez-nous &nbsp
              span pour en créer un.
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('auth')

export default {
  name: 'user-login',
  data () {
    return {
      email: '',
      password: '',
      loginError: false
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
    login () {
      const loginParams = {
        username: this.email,
        password: this.password,
        grant_type: 'password'
      }
      this.$store.dispatch('auth/login', loginParams)
        .then(() => {
          this.$router.push(this.$route.query.redirect || { name: 'user-dashboard' })
        })
        .catch(() => {
          this.loginError = true
        })
    },

    checkLoggedIn () {
      if (this.currentUser) {
        this.$router.replace(this.$route.query.redirect || { name: 'user-dashboard' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .login {
    height: calc(100% - 73px);
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
