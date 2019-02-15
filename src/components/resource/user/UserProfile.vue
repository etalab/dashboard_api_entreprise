<template lang="pug">
div
  .profile__group
    h2 Profil utilisateur
    .panel
      .form__group
        label Adresse e-mail
        div.headline {{ userDetails.email }}
      .form__group
        label Contexte
        div.headline {{ userDetails.context }}

  .profile__group
    h2 Notes
    note-update(:userId="userDetails.id", :note="userDetails.note")
    .panel
      div(v-html="toHtml(userDetails.note)")

  user-allowed-roles
</template>

<script>
import UserAddRolesForm from '@/components/resource/user/AddRoles'
import UserAllowedRoles from '@/components/resource/user/AllowedRoles'
import NoteUpdate from '@/components/resource/user/NoteUpdate'
import { mapGetters } from 'vuex'
import marked from 'marked'

export default {
  name: 'user-profile',

  computed: {
    ...mapGetters({
      userDetails: 'user/userDetails',
      allowedRoles: 'user/allowedRoles',
      allowedToCreateToken: 'user/allowedToCreateToken',
      isAdmin: 'auth/isAdmin'
    }),

    userGrantedTokenCreation () {
      return (this.isAdmin && this.allowedToCreateToken)
    }
  },

  methods: {
    toHtml (markdownText) {
      if (markdownText == null) {
        return 'Pas de note enregistrée'
      } else {
        return marked(markdownText)
      }
    }
  },

  components: {
    'user-add-roles-form': UserAddRolesForm,
    'user-allowed-roles': UserAllowedRoles,
    'note-update': NoteUpdate
  }
}
</script>

<style lang="scss" scoped>
  h2 {
    display: inline-block;
  }

  .enabled :last-child {
    color: $color-blue;
    font-weight: 700;
  }

  tr.disabled {
    color: $color-dark-grey;
    background: $color-white;
  }
</style>
