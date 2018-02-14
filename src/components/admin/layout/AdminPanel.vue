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
    // TODO use named routes for routing logic
    checkLoggedIn () {
      if (!this.currentAdmin && this.$route.path !== '/admin/login') {
        this.$router.push('/admin/login?redirect=' + this.$route.path)
      }
    }
  },

  components: {
    'nav-menu': NavMenu
  }
}
</script>
