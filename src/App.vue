<template lang="pug">
  #app
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

export default {
  name: 'app',

  // redirect to '/' (login page) when user not logged in
  updated () {
    if (!localStorage.token && this.$route.path !== '/') {
      this.$router.push('/?redirect=' + this.$route.path)
    }
  },

  components: {
    'nav-menu': NavMenu
  }
}
</script>
