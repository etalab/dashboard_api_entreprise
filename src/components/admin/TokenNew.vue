<template lang="pug">
.dialog
  button.button(@click="showDialog") Ajouter un token
  .dialog-backdrop(v-if="dialog")
    .dialog.panel
      h4 Rôles d’accès
      div(v-for="(role, index) in roles") 
        input(type="checkbox" :id="index" v-model="checked_roles" :value="role.code")
        label.label-inline(:for="index") {{role.name}}
        
      .action-buttons
        button.button.small(@click="submit") Créer
        button.button.small.warning(@click="reset") Annuler


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
    },
    showDialog: function () {
      this.dialog = true
    }
  }
}
</script>

<style lang="scss" scoped>
  .dialog-backdrop {
    position: fixed;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }

  .dialog {
    max-width: 32em;
  }

  h4 {
    margin-top: 0;
  }
</style>