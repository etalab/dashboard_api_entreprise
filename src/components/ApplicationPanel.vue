<template lang="pug">
  div
    navigation-header

    .documentation
      navigation-menu(v-if="showNavigationMenu")
      router-view
</template>

<script>
import NavigationMenu from '@/components/ui/NavigationMenu'
import NavigationHeader from '@/components/ui/NavigationHeader'

import { mapGetters } from 'vuex'

export default {
  name: 'application-panel',

  // redirect to '/login' when no user is logged in
  updated () {
    this.checkLoggedIn()
  },

  created () {
    this.checkLoggedIn()
    this.loadApp()
  },

  computed: {
    ...mapGetters({
      unknownUser: 'auth/unknownUser',
      isAdmin: 'auth/isAdmin',
      showNavigationMenu: 'ui/showNavigationMenu'
    })
  },

  methods: {
    checkLoggedIn () {
      // TODO name route + build query redirect param
      if (this.unknownUser && this.restrictedAccess()) {
        this.$router.push('/login?redirect=' + this.$route.path)
      }
    },

    restrictedAccess () {
      const allowedUserRoutes = [
        '/login',
        '/confirm'
      ]

      return allowedUserRoutes.every(route => {
        return this.$route.path !== route
      })
    },

    loadApp () {
      if (this.isAdmin) this.$router.push({ name: 'users' })
      else this.$router.push({ name: 'client-view' })
    }
  },

  components: {
    'navigation-menu': NavigationMenu,
    'navigation-header': NavigationHeader
  }
}
</script>

<style lang="scss" scoped>
  .documentation {
    height: auto;
    min-height: calc(100% - 73px);
  }
</style>
