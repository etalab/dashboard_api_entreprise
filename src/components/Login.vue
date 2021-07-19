<template lang="pug">
  .content
    .container
      h2.text-center Connectez-vous à votre tableau de bord <br />pour suivre vos endpoints API Entreprise

      .panel.api-gouv
        button.button(@click.prevent="loginSignup") Identifiez-vous avec<br> votre compte API GOUV
        p Seule la personne ayant effectué la demande d'habilitation peut accéder au tableau de bord.
        p Si vous avez besoin d'accéder au jeton d'accès mais que vous n'êtes pas cette personne, veuillez vous référer à <a href="https://entreprise.api.gouv.fr/support/#050-connection-dashboard" target="_blank">cette rubrique</a>.

      hr

    .other-login
      .column.no-account
        h3.text-center Vous n’êtes pas habilité mais vous<br> souhaitez demander un accès à API Entreprise ?

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
  height: 1px;
  margin-top: 5em;
  margin-bottom: 0;
  position: relative;
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
  margin: auto;

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
