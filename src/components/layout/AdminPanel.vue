<template lang="pug">
  v-app
    nav-menu(:drawer="drawer")

    v-toolbar(app fixed)
      v-toolbar-side-icon(@click.stop="drawer = !drawer")
      v-toolbar-title {{ currentTitle }}

    v-content
      v-container(fluid)
        router-view
</template>

<script>
import NavMenu from '@/components/layout/NavMenu'
import { mapGetters } from 'vuex'

export default {
  name: 'app',

  data () {
    return {
      drawer: true
    }
  },

  // redirect to '/' (login page) when user not logged in
  updated () {
    this.checkLoggedIn()
  },

  created () {
    this.checkLoggedIn()
  },

  computed: {
    ...mapGetters(['currentUser', 'currentTitle'])
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
