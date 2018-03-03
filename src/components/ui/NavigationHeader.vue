<template lang="pug">
  nav.nav
    .nav__container
      a.nav__link(@click="clearHomepage")
        img.nav__logo(src="../../assets/images/logo_site.svg" alt="entreprise.api.gouv.fr")

      a.logout(icon @click="logout")
        v-icon exit_to_app

</template>

<script>
export default {
  name: 'NavigationHeader',
  methods: {
    clearHomepage () {
      // TODO
    },

    logout () {
      this.$router.push({ name: 'logout' })
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
