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
          router-link(:to="{ name: 'application-panel' }" v-if="isAdmin") Espace d'administration
          router-link(:to="{ name: 'application-panel' }" v-else-if="!unknownUser") Espace Perso
        li
          a.logout(icon @click="logout" v-if="!unknownUser") Déconnexion
        li
          router-link(:to="{ name: 'login' }" v-if="unknownUser") Login

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NavigationHeader',

  computed: {
    ...mapGetters({
      isAdmin: 'auth/isAdmin',
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
</style>
