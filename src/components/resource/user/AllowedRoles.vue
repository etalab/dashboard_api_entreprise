<template lang="pug">
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
  name: 'user-allowed-roles',

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
    'user-add-roles-form': UserAddRolesForm
  }
}
</script>

<style lang="scss" scoped>
  .enabled :last-child {
    color: $color-blue;
    font-weight: 700;
  }

  tr.disabled {
    color: $color-dark-grey;
    background: $color-white;
  }
</style>
