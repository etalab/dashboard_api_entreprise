<template lang="pug">
  .login
    nav-bar
    .container
      .form__container
        form.panel
          h1 Activer votre compte utilisateur

          div(class="notification error" v-if="fieldErrors") {{ validationErrors }}
            button(class="close" aria-label="Fermer" @click="clearFieldErrors")
              svg(class="icon icon-cross")
                use(xlink:href="#icon-cross")

          p Afin de valider votre inscription, merci de renseigner votre mot de passe. Celui-ci vous sera demandé pour accéder à votre espace client.

          .form__group
            label Mot de passe
            input(type="password" v-model="password")

          .form__group
            label Confirmation
            input(type="password" v-model="password_confirmation")

          button.button(@click="submit") Finaliser l'inscription

</template>

<script>
import Navbar from '@/components/layout/Navbar'

export default {
  name: 'user-confirm',

  data () {
    return {
      password: '',
      password_confirmation: '',
      fieldErrors: false,
      validationErrors: []
    }
  },

  methods: {
    // TODO set validation for password
    submit () {
      this.$http.post('/users/confirm', {
        password: this.password,
        password_confirmation: this.password_confirmation,
        confirmation_token: this.$route.query.confirmation_token
      })
        // TODO remove alerts
        .then(response => alert('login the user and redirect to the dashboard'))
        .catch(error => {
          this.validationErrors = error.response.data.errors
          this.fieldErrors = true
        })
    },

    clearFieldErrors () {
      this.fieldErrors = false
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
