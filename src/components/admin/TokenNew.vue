<template lang="pug">
v-dialog(v-model="dialog" persistent max-width="500px")
  v-btn(fab small color="primary" dark slot="activator")
    v-icon add
  v-card
    v-card-title
      span.headline Roles d'accès
    v-card-text
      v-checkbox(v-for="(role, index) in roles" :key="index"
        :label="role.name" v-model="checked_roles" :value="role.code")
    v-card-actions
      v-spacer
      v-btn(color="blue darken-1" flat @click="reset") Annuler
      v-btn(color="blue darken-1" flat @click="submit") Créer
</template>

<script>
export default {
  name: 'token-new',
  data () {
    return {
      dialog: false,
      checked_roles: [],
      roles: null
    }
  },

  // load roles the first time the form is open
  // TODO get roles from vuex
  watch: {
    dialog: function (val) {
      if (this.roles === null && val) {
        this.$http.get('/roles')
          .then(response => {
            this.roles = response.data
          })
      }
    }
  },

  methods: {
    submit: function () {
      this.$store.dispatch('user/createToken', { roles: this.checked_roles })
        .then(() => this.reset())
        .catch(e => {
          // TODO something went wrong
        })
    },

    reset: function () {
      this.checked_roles = []
      this.dialog = false
    }
  }
}
</script>
