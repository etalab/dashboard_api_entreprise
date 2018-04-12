<template lang="pug">
.main
  user-tabs
  router-view
</template>

<script>
import UserTabs from '@/components/resource/user/Tabs'
import { mapGetters } from 'vuex'

export default {
  name: 'user-show',
  data () {
    return {}
  },
  props: ['userId'],

  created: function () {
    this.$store.dispatch('user/get', { userId: this.userId })
  },

  computed: {
    ...mapGetters({
      userDetails: 'user/userDetails',
      allowedRoles: 'user/allowedRoles',
      allowedToCreateToken: 'user/allowedToCreateToken',
      contacts: 'user/contacts',
      tokens: 'user/tokens',
      isAdmin: 'auth/isAdmin'
    }),

    userGrantedTokenCreation () {
      return (this.isAdmin && this.allowedToCreateToken)
    }
  },

  components: {
    'user-tabs': UserTabs
  }
}
</script>

<style lang="scss" scoped>
  .main-pane {
    height: auto;
  }

  .profile__group + .profile__group {
    margin-top: 3em;
  }

  .profile__group > h2 {
    margin-top: 0;
  }

  label {
    color: $color-dark-grey;
  }

  .contact__container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 1em;
  }

  table {
    margin-bottom: 2em;
  }

  @media (max-width: 949px) {
    .contact__container {
      flex-direction: column;
    }
  }

  .enabled :last-child{
    color: $color-blue;
    font-weight: 700;
  }

  tr.disabled {
    color: $color-dark-grey;
    background: $color-white;
  }

  .profile__tabs {
    margin: 0;
    margin-bottom: 3em;
    padding: 0;
  }

  .profile__tabs li {
    display: inline;
  }

  .profile__tabs li + li {
    margin-left: 1em;
  }

  .profile__tabs a {
    display: inline-block;
    background: $color-white;
    border-radius: 3px;
    box-shadow: 0 0 4px $color-light-grey;
    padding: .75em 1.5em;
  }

  .profile__tabs .router-link-active {
    background: $color-blue;
    color: $color-white;
  }
</style>
