<template lang="pug">
  router-view
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('auth')

export default {
  name: 'user-app',

  // redirect to '/' (login page) when user not logged in
  updated () {
    this.checkLoggedIn()
  },

  created () {
    this.checkLoggedIn()
  },

  mounted () {
    this.checkLoggedIn()
  },

  computed: {
    ...mapGetters(['currentUser'])
  },

  methods: {
    checkLoggedIn () {
      if (!this.currentUser && this.restrictedAccess()) {
        this.$router.push('/account/login?redirect=' + this.$route.path)
      }
    },

    // TODO make it a helper to share the logic with admin
    restrictedAccess () {
      const allowedUserRoutes = [
        '/account/login',
        '/account/confirm'
      ]

      return allowedUserRoutes.every(route => {
        return this.$route.path !== route
      })
    }

  }
}
</script>
