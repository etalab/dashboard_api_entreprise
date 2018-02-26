<template lang="pug">
.main-pane
  form
    h2 Création d'un nouvel utilisateur

    v-alert(
      color="error"
      icon="warning"
      dismissible
      v-model="validationFailure"
      ) {{ validationErrorMsg }}

    .form__group
      label Email
      input(v-model="userEmail"
      :error-messages="errors.collect('email')"
      v-validate="'required|email'"
      data-vv-name="email")

    .form__group
      label= "Contexte"
      input(v-model="userContext"
      data-vv-name="context")

    .contact__group
      h3 Contact administratif
      .form__group
        label Email
        input(
        v-model="adminContactEmail"
        :error-messages="errors.collect('admin_email')"
        v-validate="'email'"
        data-vv-name="admin_email")

      .form__group
        label Téléphone
        input(
        v-model="adminContactPhone"
        data-vv-name="admin_phone")

    .contact__group
      h3 Contact technique
      .form__group
        label Email
        input(
        v-model="techContactEmail"
        :error-messages="errors.collect('tech_email')"
        v-validate="'email'"
        data-vv-name="tech_email")

      .form__group
        label Téléphone
        input(
        v-model="techContactPhone"
        data-vv-name="tech_phone")

    button.button(@click="submit") Créer
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('user/create')

export default {
  name: 'user-new',
  data () {
    return {
      validationErrorMsg: '',
      validationFailure: false
    }
  },

  computed: {
    ...mapState({
      userForm: state => state.user_form
    }),

    // TODO refactor this following https://ypereirareis.github.io/blog/2017/04/25/vuejs-two-way-data-binding-state-management-vuex-strict-mode/
    // ... or this https://github.com/maoberlehner/vuex-map-fields
    userEmail: {
      get () { return this.userForm.email },
      set (value) { this.$store.commit('user/create/updateField', { field: 'email', val: value }) }
    },

    userContext: {
      get () { return this.userForm.context },
      set (value) { this.$store.commit('user/create/updateField', { field: 'context', val: value }) }
    },

    adminContactEmail: {
      get () { return this.userForm.adminContactEmail },
      set (value) { this.$store.commit('user/create/updateField', { field: 'adminContactEmail', val: value }) }
    },

    adminContactPhone: {
      get () { return this.userForm.adminContactPhone },
      set (value) { this.$store.commit('user/create/updateField', { field: 'adminContactPhone', val: value }) }
    },

    techContactEmail: {
      get () { return this.userForm.techContactEmail },
      set (value) { this.$store.commit('user/create/updateField', { field: 'techContactEmail', val: value }) }
    },

    techContactPhone: {
      get () { return this.userForm.techContactPhone },
      set (value) { this.$store.commit('user/create/updateField', { field: 'techContactPhone', val: value }) }
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

          // TODO handle routing and error with vuex
          this.$store.dispatch('user/create/submit')
            .then(data => this.$router.push({ name: 'users' }))
            .catch(e => {
              this.validationErrorMsg = e.response.data.errors
              this.validationFailure = true
            })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .contact__group {
    margin: 3em 0;
  }
</style>
