<template lang="pug">
  router-view
</template>

<script>
import { mapGetters } from 'vuex'

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

    this.$store.dispatch('fetch_user')
  },

  computed: {
    ...mapGetters(['currentUser', 'currentTitle'])
  },

  methods: {
    checkLoggedIn () {
      if (!this.currentUser && this.$route.path !== '/account/login') {
        this.$router.push('/account/login?redirect=' + this.$route.path)
      }
    }
  }
}
</script>
