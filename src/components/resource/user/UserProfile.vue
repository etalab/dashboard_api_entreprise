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

  user-allowed-roles
</template>

<script>
import UserAddRolesForm from '@/components/resource/user/AddRoles'
import UserAllowedRoles from '@/components/resource/user/AllowedRoles'
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
    'user-add-roles-form': UserAddRolesForm,
    'user-allowed-roles': UserAllowedRoles
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
