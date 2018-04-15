<template lang="pug">
  .main
    ul.profile__tabs
      li
        router-link(:to="{ name: routeTo('profile') }") Profil
      li
        router-link(:to="{ name: routeTo('tokens') }") Tokens
      li
        router-link(:to="{ name: routeTo('contacts') }") Contacts

    // Tabs above are yield here as nested routes
    router-view
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'user-tabs',

  props: ['userId'],

  created: function () {
    this.$store.dispatch('user/get', { userId: this.userId })
  },

  computed: {
    ...mapGetters({
      isAdmin: 'auth/isAdmin'
    })
  },

  methods: {
    routeTo (tabName) {
      switch (tabName) {
        case 'profile':
          return this.isAdmin ? 'admin-user-profile' : 'client-profile'

        case 'tokens':
          return this.isAdmin ? 'admin-user-tokens' : 'client-tokens'

        case 'contacts':
          return this.isAdmin ? 'admin-user-contacts' : 'client-contacts'

        default:
          console.error('This route tab do not exists:', tabName)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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
