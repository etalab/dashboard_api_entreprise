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
    h2 Droits de l'utilisateur
      span(v-if="userGrantedTokenCreation") (Cet utilisateur a les droits de création de token)
    .panel
      table
        thead
          th Endpoint
          th Actif
        tbody
          tr(v-for="(role, index) in allowedRoles" :key="index" :class="role.allowed ? 'enabled' : 'disabled'")
            td {{ role.name }}
            td {{ role.allowed ? 'Oui' : 'Non' }}
    user-add-roles-form(v-if="userGrantedTokenCreation")
</template>

<script>
import UserAddRolesForm from '@/components/resource/user/AddRoles'
import { mapGetters } from 'vuex'

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

  components: {
    'user-add-role-form': UserAddRolesForm
  }
}
</script>
