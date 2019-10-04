<template lang="pug">
  .login
    .container
      .form__container
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

          .form__group
            input(type="checkbox" id="cgu_checkbox" v-model="cguChecked")
            label.label-inline(for="cgu_checkbox") En confirmant votre compte utilisateur vous acceptez nos&nbsp;
              a(href="https://entreprise.api.gouv.fr/cgu/" target="_blank") Conditions Générales d'Utilisation

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
