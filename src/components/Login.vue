<template lang="pug">
  .content
    .container
      h2 Connectez-vous à votre tableau de bord pour suivre vos endpoints API Entreprise

      .panel.api-gouv
        h3 Vous êtes client de API Entreprise depuis septembre 2019 ?
        button.button(@click.prevent="loginSignup") Identifiez-vous avec<br> votre compte API GOUV

      hr

    .other-login
      .container
        .row
          .column
            form.panel.panel--grey
              h3.text-center Connexion habituelle

              p Vous aviez l’habitude de vous connecter avec vos identifiants API Entreprise, vous pouvez toujours le faire ici :

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
            h3.text-center Vous n’êtes pas habilités mais vous<br> souhaitez demander un accès à API Entreprise ?

            a.button(href="https://entreprise.api.gouv.fr") Découvrez les services d’API Entreprise

            a.button(href="https://entreprise.api.gouv.fr/doc/#demande-habilitation") Découvrez les étapes pour demander un accès
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
  flex-direction: column;
  align-items: center;
  padding-top: 5em;
  position: relative;
}

hr {
  border-bottom: 1px solid $color-light-grey;
  border: 0;
  background-image: linear-gradient(
    to right,
    $color-light-grey,
    $color-light-grey 48%,
    transparent 48%,
    transparent 52%,
    $color-light-grey 52%
  );
  height: 1px;
  margin-top: 5em;
  margin-bottom: 0;
  position: relative;

  &::after {
    content: "OU";
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translate(-50%);
  }
}

.other-login {
  background: $color-white;
  flex-grow: 1;
  padding: 5em 0;
  width: 100%;
}

.column {
  flex: 1 1 50%;
}

.column h2 {
  text-align: center;
}

.panel {
  align-items: center;
  border: 0;
  border-radius: 0;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 30em;
  padding: 2em;
}

.api-gouv {
  margin-top: 4em;

  h3 {
    font-family: "Source Sans Pro";
    font-size: 1em;
    font-weight: 400;
  }

  button.button {
    font-weight: 700;
    margin: 0 0 1em;
  }
}

.panel--grey {
  background-color: $color-lightest-grey;
  margin: 0;
  width: 100%;

  .form__group {
    width: 100%;
  }

  .button {
    margin-top: 2em;
  }
}

.no-account {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h3 {
    font-family: "Source Sans Pro";
    font-size: 1em;
    font-weight: 400;
  }

  a.button {
    background-color: $color-white;
    border: 1px solid $color-blue;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
    color: $color-blue;
    text-align: center;

    &:hover {
      color: $color-dark-blue;
      box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
    }
  }

  a.button + a.button {
    margin: 1em 0 0;
  }
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
