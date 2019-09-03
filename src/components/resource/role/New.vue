<template lang="pug">
.main
  form.panel
    h2 Ajout d'un nouveau rôle

    .notification.error(v-if="validationFailure") {{ alertMessage }}
      button(class="close" aria-label="Fermer" @click.prevent="clearRole")
                svg(class="icon icon-cross")
                  use(xlink:href="#icon-cross")

    .form__group
      label Nom
      input(
      v-model="role.name"
      :counter="50"
      :error-messages="errors.collect('name')"
      v-validate="'required|max:50'"
      data-vv-name="name")

    .form__group
      label Code
      input(v-model="role.code"
      :error-messages="errors.collect('code')"
      v-validate="'required'"
      data-vv-name="code")

    .form__group
      button.button.secondary(
        @click.prevent="cancel"
       ) Annuler

      button.button.submit(
        @click.prevent="submit"
       ) Créer
</template>

<script>
export default {
  name: "RoleNew",
  data() {
    return {
      validationFailure: false,
      alertMessage: "",
      role: {}
    };
  },

  methods: {
    submit: function() {
      this.$validator.validateAll().then(result => {
        if (!result) {
          this.alertMessage = "Tous les champs ne sont pas valides !";
          this.validationFailure = true;
          return;
        }

        const params = {
          name: this.role.name,
          code: this.role.code
        };
        // POST request to create role
        this.$store
          .dispatch("role/create", params)
          .then(() => {
            this.$router.push({ name: "roles" });
          })
          .catch(error => {
            this.alertMessage = error;
            this.validationFailure = true;
          });
      });
    },
    clearRole() {
      this.validationFailure = false;
      this.role = {};
    },
    cancel: function() {
      this.$router.push({ name: "roles" });
    }
  }
};
</script>
