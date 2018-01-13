<template lang="pug">
  v-app
    nav-menu
    v-toolbar(app)
    main
      v-content
        v-container(fluid)
          router-view
</template>

<script>
import NavMenu from '@/components/layout/NavMenu'
import { mapGetters } from 'vuex'

export default {
  name: 'app',

  // redirect to '/' (login page) when user not logged in
  updated () {
    this.checkLoggedIn()
  },

  created () {
    this.checkLoggedIn()
  },

  computed: {
    ...mapGetters(['currentUser'])
  },

  methods: {
    checkLoggedIn () {
      if (!this.currentUser && this.$route.path !== '/login') {
        this.$router.push('/login?redirect=' + this.$route.path)
      }
    }
  },

  components: {
    'nav-menu': NavMenu
  }
}
</script>
