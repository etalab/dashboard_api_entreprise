<template lang="pug">
  .content
    .container
      form.panel
        h1 Vous avez oublié votre mot de passe ?

        p Renseignez l'adresse e-mail de votre compte dans le champ ci-dessous, un lien de régénération de mot de passe vous sera envoyé par email.

        div(class="notification error" v-if="errorsArePresent")
          ul
            li(v-for="(errorMsg, fieldKey) in apiErrors" :key="fieldKey") {{ fieldKey }} : {{ errorMsg }}
          button(class="close" aria-label="Fermer" @click.prevent="clearFieldErrors")
            svg(class="icon icon-cross")
              use(xlink:href="#icon-cross")

        div(class="notification success" v-if="requestSuccess")
          p Un lien de régénération de votre mot de passe vous a été envoyé par email.

        .form__group
          label E-mail
          input(type="email" v-model="email")

        button.button(@click.prevent="requestPasswordReset") Récupérer mon mot de passe
</template>

<script>
export default {
  name: "PasswordResetRequest",
  data() {
    return {
      email: "",
      apiErrors: {},
      requestSuccess: false
    };
  },

  computed: {
    errorsArePresent: function() {
      const errorsCount = Object.keys(this.apiErrors).length;
      return errorsCount > 0;
    }
  },

  methods: {
    requestPasswordReset() {
      const payload = { email: this.email };
      this.$store
        .dispatch("auth/passwordResetRequest", payload)
        .then(() => {
          this.requestSuccess = true;
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
