<template lang="pug">
div
  h4 Création d'un nouvel utilisateur

  v-alert(
    color="error"
    icon="warning"
    dismissible
    v-model="validationFailure"
    ) {{ validationErrorMsg }}

  form
    v-text-field(
      v-model="user.email"
      label= "Email"
      :error-messages="errors.collect('email')"
      v-validate="'required|email'"
      data-vv-name="email"
      required)

    v-text-field(
      v-model="user.context"
      label= "Contexte"
      :error-messages="errors.collect('context')"
      data-vv-name="context")

    v-btn(@click="submit") Créer
</template>

<script>
export default {
  name: 'user-new',
  data () {
    return {
      user: {},
      validationErrorMsg: '',
      validationFailure: false
    }
  },

  methods: {
    submit: function () {
      this.$validator.validateAll()
        .then(result => {
          if (!result) {
            this.validationErrorMsg = 'Tous les champs ne sont pas valides !'
            this.validationFailure = true
            return
          }

          this.$http.post('/users', {
            email: this.user.email,
            context: this.user.context
          })
            .then(response => {
              this.$router.push({ name: 'users' })
            })
            .catch(e => {
              this.validationErrorMsg = e.response.data.errors
              this.validationFailure = true
            })
        })
    }
  }
}
</script>

