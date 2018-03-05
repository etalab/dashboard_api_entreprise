<template lang="pug">
.main-pane
  form
    h2 Ajout d'un nouveau rôle
    //- Closing the alert will set v-model to false
    v-alert(
      color="error"
      icon="warning"
      dismissible
      v-model="validationFailure"
      ) {{ alertMessage }}

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

    button.button(
      @click="submit"
     ) Créer
</template>

<script>
export default {
  name: 'role-new',
  data () {
    return {
      validationFailure: false,
      alertMessage: '',
      role: {}
    }
  },

  methods: {
    submit: function () {
      this.$validator.validateAll()
        .then(result => {
          if (!result) {
            this.alertMessage = 'Tous les champs ne sont pas valides !'
            this.validationFailure = true
            return
          }

          const params = {
            name: this.role.name,
            code: this.role.code
          }
          // POST request to create role
          this.$store.dispatch('role/create', params)
            .then(() => {
              this.$router.push({ name: 'roles' })
            })
            .catch(error => {
              this.alertMessage = error
              this.validationFailure = true
            })
        })
    }
  }
}
</script>
