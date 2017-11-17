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
      data-vv-name="context")

    br

    div
      h6 Contact administratif
      v-text-field(
        v-model="admin_contact.email"
        label= "Email"
        :error-messages="errors.collect('admin_email')"
        v-validate="'email'"
        data-vv-name="admin_email")

      v-text-field(
        v-model="admin_contact.phone_number"
        label= "Téléphone"
        data-vv-name="admin_email")

    div
      h6 Contact technique
      v-text-field(
        v-model="tech_contact.email"
        label= "Email"
        :error-messages="errors.collect('tech_email')"
        v-validate="'email'"
        data-vv-name="tech_email")

      v-text-field(
        v-model="tech_contact.phone_number"
        label= "Téléphone"
        data-vv-name="tech_email")

    v-btn(@click="submit") Créer
</template>

<script>
export default {
  name: 'user-new',
  data () {
    return {
      user: {},
      admin_contact: {},
      tech_contact: {},
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

          this.$http.post('/users', this.set_user_payload())
            .then(response => {
              this.$router.push({ name: 'users' })
            })
            .catch(e => {
              this.validationErrorMsg = e.response.data.errors
              this.validationFailure = true
            })
        })
    },

    set_user_payload: function () {
      let contacts = []
      if (this.admin_contact['email'] || this.admin_contact['phone_number']) {
        contacts.push({
          email: this.admin_contact.email,
          phone_number: this.admin_contact.phone_number,
          contact_type: 'admin'
        })
      }
      if (this.tech_contact['email'] || this.tech_contact['phone_number']) {
        contacts.push({
          email: this.tech_contact.email,
          phone_number: this.tech_contact.phone_number,
          contact_type: 'tech'
        })
      }

      let payload = {
        email: this.user.email,
        context: this.user.context
      }
      if (contacts.length > 0) { payload.contacts = contacts }
      return payload
    }
  }
}
</script>

