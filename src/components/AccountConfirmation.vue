<template lang="pug">
  .content
    .container
        form.panel
          h1 Activer votre compte utilisateur

          div(class="notification error" v-if="fieldErrors") {{ validationErrors }}
            button(class="close" aria-label="Fermer" @click.prevent="clearFieldErrors")
              svg(class="icon icon-cross")
                use(xlink:href="#icon-cross")

          p Afin de valider votre inscription, merci de renseigner votre mot de passe. Celui-ci vous sera demandé pour accéder à votre espace client.

          .form__group
            label Mot de passe
            input(type="password" v-model="password")

          .form__group
            label Confirmation
            input(type="password" v-model="password_confirmation")

          button.button(@click.prevent="submit") Finaliser l'inscription

</template>

<script>
export default {
  name: "AccountConfirmation",

  data() {
    return {
      password: "",
      password_confirmation: "",
      cguChecked: false,
      fieldErrors: false,
      validationErrors: []
    };
  },

  methods: {
    // TODO set validation for password
    submit() {
      const payload = {
        password: this.password,
        password_confirmation: this.password_confirmation,
        cgu_checked: this.cguChecked,
        confirmation_token: this.$route.query.confirmation_token
      };
      this.$store
        .dispatch("auth/confirm", payload)
        .then(() => {
          this.$router.push({ name: "application-panel" });
        })
        .catch(error => {
          this.validationErrors = error;
          this.fieldErrors = true;
        });
    },

    clearFieldErrors() {
      this.fieldErrors = false;
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
