<template lang="pug">
  div
    navigation-header

    .documentation
      navigation-menu(v-if="currentUser.isAdmin()")
      router-view
</template>

<script>
import NavigationMenu from '@/components/ui/NavigationMenu'
import NavigationHeader from '@/components/ui/NavigationHeader'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('auth')

export default {
  name: 'application-panel',

  // redirect to '/login' when no user is logged in
  updated () {
    this.checkLoggedIn()
    this.loadApp()
  },

  created () {
    this.checkLoggedIn()
    this.loadApp()
  },

  computed: {
    ...mapGetters(['currentUser'])
  },

  methods: {
    checkLoggedIn () {
      // TODO name route + build query redirect param
      if (!this.currentUser && this.restrictedAccess()) {
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
      if (this.currentUser.isAdmin()) this.$router.push({ name: 'users' })
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
