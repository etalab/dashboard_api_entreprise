<template lang="pug">
.dialog
  button.button.small.title-button(@click="showDialog") Ajouter un token
  .dialog-backdrop(v-if="dialog")
    .dialog.panel
      h2 Ajout d’un nouveau token
      .form__group
        label(for="agent-name") Organisme utilisateur final (ex: numéro SIRET)
        input(type="text" v-model="subject" id="agent-name")

      .form__group
        label Rôles d’accès
        div(v-for="role in allowedRoles")
          input(type="checkbox" :id="role.code" v-model="checked_roles" :value="role.code")
          label.label-inline(:for="role.code") {{role.name}}

      // Ask for end user contact information if non-admin
      .form__group(v-if="!isAdmin")
        label(for="agent-email") Adresse e-mail
        input(type="email" v-model="contact_email" id="agent-email")

        label(for="agent-phone") Téléphone
        input(type="text" v-model="contact_phone" id="agent-phone")

      .action-buttons
        button.button.small(@click="submit") Créer
        button.button.small.warning(@click="reset") Annuler

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'jwt-api-entreprise-new',
  data () {
    return {
      dialog: false,
      subject: '',
      checked_roles: [],
      contact_email: null,
      contact_phone: null
    }
  },

  computed: {
    ...mapGetters({
      allRoles: 'role/index',
      userTaggedRoles: 'user/allowedRoles',
      isAdmin: 'auth/isAdmin'
    }),

    allowedRoles () {
      const userGivenRoles = this.userTaggedRoles.filter(role => role.allowed)
      return this.isAdmin ? this.allRoles : userGivenRoles
    }
  },

  methods: {
    submit: function () {
      let payload = {
        roles: this.checked_roles,
        subject: this.subject,
        contact: {
          email: this.contact_email
        }
      }
      if (this.contact_phone) payload.contact.phone_number = this.contact_phone

      this.$store.dispatch('user/createToken', payload)
        .then(() => this.reset())
        .catch(e => {
          // TODO something went wrong
        })
    },

    reset: function () {
      this.checked_roles = []
      this.dialog = false
      this.subject = ''
      this.contact_email = this.contact_phone = null
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
    display: inline-block;
  }

  h2 {
    margin-top: 0;
  }

  .action-buttons {
    margin-top: 2em;
  }
</style>
