<template lang="pug">
.dialog
  button.button(@click="showDialog") Ajouter un token
  .dialog-backdrop(v-if="dialog")
    .dialog.panel
      h2 Ajout d’un nouveau token
      .form__group
        label(for="agent-name") Agent utilisateur
        input(type="text" v-model="subject" id="agent-name")

      .form__group
        label Rôles d’accès
        div(v-for="role in index")
          input(type="checkbox" :id="role.code" v-model="checked_roles" :value="role.code")
          label.label-inline(:for="role.code") {{role.name}}

      .action-buttons
        button.button.small(@click="submit") Créer
        button.button.small.warning(@click="reset") Annuler

</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('role')

export default {
  name: 'jwt-api-entreprise-new',
  data () {
    return {
      dialog: false,
      subject: '',
      checked_roles: []
    }
  },

  computed: {
    ...mapGetters(['index'])
  },

  methods: {
    submit: function () {
      this.$store.dispatch('user/createToken', { roles: this.checked_roles, subject: this.subject })
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
  label.label-inline {
    color: $color-black;
  }

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

  h2 {
    margin-top: 0;
  }

  .action-buttons {
    margin-top: 2em;
  }
</style>
