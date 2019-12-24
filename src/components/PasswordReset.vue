<template lang="pug">
  .content
    .container
      form.panel
        h1 Renouveler votre mot de passe

        div(class="notification error" v-if="errorsArePresent")
          ul
            li(v-for="(errorMsg, fieldKey) in apiErrors" :key="fieldKey") {{ fieldKey }} : {{ errorMsg }}
          button(class="close" aria-label="Fermer" @click.prevent="clearFieldErrors")
            svg(class="icon icon-cross")
              use(xlink:href="#icon-cross")

        p Renseignez votre nouveau mot de passe à l'aide du formulaire suivant.

        .form__group
          label Mot de passe
          input(type="password" v-model="password")

        .form__group
          label Confirmation
          input(type="password" v-model="password_confirmation")

        button.button(@click.prevent="requestPassword") Changer mon mot de passe
</template>

<script>
export default {
  name: "PasswordReset",
  data() {
    return {
      password: "",
      password_confirmation: "",
      apiErrors: {}
    };
  },

  computed: {
    errorsArePresent: function() {
      const errorsCount = Object.keys(this.apiErrors).length;
      return errorsCount > 0;
    }
  },

  methods: {
    requestPassword() {
      const payload = {
        password: this.password,
        password_confirmation: this.password_confirmation,
        token: this.$route.query.token
      };
      this.$store
        .dispatch("auth/passwordReset", payload)
        .then(() => {
          this.$router.push({ name: "application-panel" });
        })
        .catch(error => {
          this.apiErrors = error;
        });
    },

    clearFieldErrors() {
      this.apiErrors = {};
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
