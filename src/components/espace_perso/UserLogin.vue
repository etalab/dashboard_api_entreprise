<template lang="pug">
  .login
    navbar
    .container
      .form__container
        form.panel
          h1 Bienvenue sur votre espace client

          .form__group
            label Identifiant
            input

          .form__group
            label Mot de passe
            input
            small
              a Mot de passe oublié ?

          button.button S'identifier

          .signup.text-center Pas de compte ? 
            a Contactez-nous 
            pour en créer un.

</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'user-login',
  components: {
    'Navbar': Navbar
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
