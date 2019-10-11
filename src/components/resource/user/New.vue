<template lang="pug">
.main
  form.panel
    h2 Création d'un nouvel utilisateur

    .notification.error(v-if="validationFailure") {{ validationErrorMsg }}

    .form__group
      label Email
      input(v-model="userEmail"
      name="email"
      v-validate="'required|email'")
      div.notification.error.error_field(v-if="errorsExist('email')") {{ errorsFor('email') }}

    .form__group
      label Contexte
      input(v-model="userContext")

    button.button(@click.prevent="submit") Créer
</template>

<script>
export default {
  name: "UserNew",

  data() {
    return {
      userEmail: "",
      userContext: "",
      validationErrorMsg: "",
      validationFailure: false
    };
  },

  computed: {
    errorsExist() {
      return field => {
        this.validationFailure && this.errors.first(field) !== null;
      };
    },
    errorsFor() {
      return field => this.errors.first(field);
    }
  },

  methods: {
    submit: function() {
      const payload = {
        email: this.userEmail,
        context: this.userContext
      };

      this.$validator.validateAll().then(result => {
        if (!result) {
          this.validationErrorMsg = "Tous les champs ne sont pas valides !";
          this.validationFailure = true;
          return;
        }

        // TODO handle routing and error with vuex
        this.$store
          .dispatch("user/create", payload)
          .then(() => this.reset())
          .catch(e => {
            this.validationErrorMsg = e.response.data.errors;
            this.validationFailure = true;
          });
      });
    },

    reset() {
      this.userEmail = "";
      this.userContext = "";
      this.validationFailure = false;
      this.$router.push({ name: "users" });
    }
  }
};
</script>

<style lang="scss" scoped>
.contact__group {
  margin: 3em 0;
}

.button {
  margin-top: 2em;
}

.error_field {
  margin-top: 0.5em;
}
</style>
