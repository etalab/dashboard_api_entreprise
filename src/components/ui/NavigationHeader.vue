<template lang="pug">
  header.navbar
    .navbar__container
      a.navbar__home(@click="clearHomepage")
        img.navbar__logo(src="../../assets/images/logo_site.svg" alt="entreprise.api.gouv.fr")

      nav
        ul.nav__links
          li.nav__item
            router-link(:to="{ name: 'real_time' }") Temps réel
          li.nav__item
            router-link(:to="{ name: 'endpoints_history' }") Historique
          li.nav__item
            router-link(:to="{ name: 'documentation' }") Documentation
          li.nav__item
            router-link(:to="{ name: 'application-panel' }" v-if="isAdmin") Espace d'administration
            router-link(:to="{ name: 'application-panel' }" v-else-if="!unknownUser") Espace Perso
          li.nav__item
            a.logout(@click="logout" v-if="!unknownUser")
              img(class="lock" alt="" src="../../assets/images/lock.svg")
              | Déconnexion
          li.nav__item
            router-link(:to="{ name: 'login' }" v-if="unknownUser")
              img(class="lock" alt="" src="../../assets/images/lock.svg")
              | Connexion

</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "NavigationHeader",

  computed: {
    ...mapGetters({
      isAdmin: "auth/isAdmin",
      unknownUser: "auth/unknownUser"
    })
  },

  methods: {
    clearHomepage() {
      // TODO
    },

    logout() {
      this.$router.push({ name: "logout" });
    }
  }
};
</script>

<style lang="scss">
.lock {
  display: inline-block;
  height: 1em;
  vertical-align: middle;
  margin-bottom: 0.2em;
  margin-right: 0.25em;
}
</style>
