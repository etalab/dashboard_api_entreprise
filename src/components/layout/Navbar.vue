<template lang="pug">
  nav.nav
    .nav__container
      a.nav__link(@click="clearHomepage")
        img.nav__logo(src="../../assets/images/logo_site.svg" alt="entreprise.api.gouv.fr")

      a.logout(icon @click="logoutAndRedirect")
        v-icon exit_to_app

</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('auth')

export default {
  name: 'Navbar',
  methods: {
    clearHomepage () {
      // TODO
    },

    ...mapActions(['logout']),

    logoutAndRedirect () {
      this.logout()
        .then(() => this.$router.push({ name: 'login' }))
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  box-sizing: initial;
}

.logout {
  margin-right: 1em;
}
</style>
