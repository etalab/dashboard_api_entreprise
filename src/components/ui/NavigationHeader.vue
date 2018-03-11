<template lang="pug">
  nav.nav
    .nav__container
      a.nav__link(@click="clearHomepage")
        img.nav__logo(src="../../assets/images/logo_site.svg" alt="entreprise.api.gouv.fr")

      ul.nav__links
        li
          router-link(:to="{ name: 'real_time' }") Temps réel
        li
          router-link(:to="{ name: 'endpoints_history' }") Historique
        li
          router-link(:to="{ name: 'incidents' }") Incidents
        li
          router-link(:to="{ name: 'client-view' }" v-if="!unknownUser") Espace Perso
        li
          a.logout(icon @click="logout" v-if="!unknownUser")
            v-icon exit_to_app
        li
          router-link(:to="{ name: 'login' }" v-if="unknownUser") Login

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
