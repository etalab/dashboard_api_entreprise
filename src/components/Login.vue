<template lang="pug">
  .content
    .container
      .row.panel
        .column
          form
            h2 Connectez-vous !

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

        .column.no-account
          h2 Pas de compte ?

          .no-account__content
            button.button(@click.prevent="loginSignup") Se connecter avec Signup

            .or ou

            .signup.text-center
                a(href="mailto:support@entreprise.api.gouv.fr") Contactez-nous
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
    },

    loginSignup() {
      const oauthUrl =
        process.env.VUE_APP_OAUTH_API_GOUV_AUTHORIZATION_ENDPOINT +
        "?" +
        "redirect_uri=" +
        process.env.VUE_APP_OAUTH_API_GOUV_REDIRECT_URI +
        "&" +
        "client_id=" +
        process.env.VUE_APP_OAUTH_API_GOUV_CLIENT_ID +
        "&" +
        "scope=openid email&" +
        "response_type=code";

      window.location = oauthUrl;
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

.row.panel {
  margin: auto;
  max-width: 45em;
}

.column {
  flex: 1 1 50%;
}

.column + .column {
  border-left: 1px solid $color-light-grey;
  margin-left: 2em;
  padding-left: 2em;
}

.column h2 {
  text-align: center;
}

button.button,
button.button:active {
  margin: 2em auto 0;
  display: block;
}

.no-account {
  display: flex;
  flex-direction: column;
}

.no-account__content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
}

.no-account__content .or {
  color: $color-dark-grey;
  margin: 2em auto;
  text-transform: uppercase;
}

.no-account__content .button,
.no-account__content .button:active {
  margin-top: 0;
}

hr {
  border-bottom: 1px solid $color-light-grey;
}

@media (max-width: 749px) {
  .column + .column {
    border-left: 0;
    border-top: 1px solid $color-light-grey;
    margin-left: 0;
    margin-top: 2em;
    padding-left: 0;
    padding-top: 2em;
  }
}
</style>
