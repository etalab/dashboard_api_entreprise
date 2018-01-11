<template lang="pug">
v-dialog(v-model="dialog" persistent max-width="500px")
  v-btn(fab small color="pink" dark slot="activator")
    v-icon add
  v-card
    v-card-title
      span.headline Roles d'accès
    v-card-text
      v-checkbox(v-for="(role, index) in roles" :key="index"
        :label="role.name" v-model="token_payload" :value="role.code")
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
      token_payload: [],
      roles: null
    }
  },

  // load roles the first time the form is open
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
      let userId = this.$route.params.id
      this.$http.post(`/users/${userId}/tokens`, {
        token_payload: this.token_payload
      })
        .then(response => {
          this.$emit('tokenCreated', response.data.new_token)
          this.reset()
        })
        .catch(e => {
          // TODO something went wrong
        })
    },

    reset: function () {
      this.token_payload = []
      this.dialog = false
    }
  }
}
</script>
