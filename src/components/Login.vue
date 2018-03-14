<template lang="pug">
  div
    navigation-header

    .login
      .container
        .form__container
          form.panel
            h1 Connectez vous !

            .notification.error(v-if="loginError") L’authentification a échoué

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

export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: '',
      loginError: false
    }
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
