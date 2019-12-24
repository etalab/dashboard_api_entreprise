<template lang="pug">
  .content
    .container
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
            router-link(:to="{ name: 'account-password-reset-request' }") Mot de passe oublié ?

        button.button(@click.prevent="login") S'identifier

        .signup.text-center Pas de compte ?
          div
            a Contactez-nous
            span &nbsppour en créer un.
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      loginError: false
    };
  },

  methods: {
    login() {
      const loginParams = {
        username: this.email,
        password: this.password,
        grant_type: "password"
      };
      this.$store
        .dispatch("auth/login", loginParams)
        .then(() => {
          this.$router.push({ name: "application-panel" });
        })
        .catch(() => {
          this.loginError = true;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  height: calc(100vh - 73px);
  display: flex;
  align-items: center;
  position: relative;
}

button.button,
button.button:active {
  margin: 2em auto 0;
  display: block;
}

.signup {
  margin-top: 2em;
}
</style>
