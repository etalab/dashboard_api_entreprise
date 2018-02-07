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
import NavMenu from '@/components/admin/layout/NavMenu'
import { mapGetters } from 'vuex'

export default {
  name: 'app',

  data () {
    return {
      drawer: true
    }
  },

  // redirect to '/' (login page) when admin not logged in
  updated () {
    this.checkLoggedIn()
  },

  created () {
    this.checkLoggedIn()
  },

  computed: {
    ...mapGetters(['currentAdmin', 'currentTitle'])
  },

  methods: {
    checkLoggedIn () {
      if (!this.currentAdmin && this.$route.path !== '/login') {
        this.$router.push('/login?redirect=' + this.$route.path)
      }
    }
  },

  components: {
    'nav-menu': NavMenu
  }
}
</script>
