<template lang="pug">
  nav.nav
    .nav__container
      a.nav__link(@click="clearHomepage")
        img.nav__logo(src="../../assets/images/logo_site.svg" alt="entreprise.api.gouv.fr")

      a.logout(icon @click="logout" v-if="!unknownUser")
        v-icon exit_to_app

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NavigationHeader',

  computed: {
    ...mapGetters({
      unknownUser: 'auth/unknownUser'
    })
  },

  methods: {
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
