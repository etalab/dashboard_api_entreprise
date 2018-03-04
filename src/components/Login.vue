<template lang="pug">
  div
    navigation-header

    .login
      .container
        .form__container
          form.panel
            h1 Connectez vous !

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
import NavigationHeader from '@/components/ui/NavigationHeader'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('auth')

export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: '',
      loginError: false
    }
  },

  // redirect to /admin when user already logged in
  created () {
    this.checkLoggedIn()
  },

  updated () {
    this.checkLoggedIn()
  },

  computed: {
    ...mapGetters(['unknownUser'])
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
          this.$router.push(this.$route.query.redirect || { name: 'application-panel' })
        })
        .catch(() => {
          this.loginError = true
        })
    },

    checkLoggedIn () {
      if (!this.unknownUser) {
        this.$router.replace(this.$route.query.redirect || { name: 'application-panel' })
      }
    }
  },

  components: {
    'navigation-header': NavigationHeader
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
