<template lang="pug">
  nav.nav
    .nav__container
      a.nav__link(@click="clearHomepage")
        img.nav__logo(src="../../assets/images/logo_site.svg" alt="entreprise.api.gouv.fr")

</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    clearHomepage () {
      // TODO
    }
  }
}
</script>

<style lang="scss" scoped>
.nav {
  position: fixed;
  top: 0;
}

a {
  box-sizing: initial;
}
</style>
