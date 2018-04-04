<template lang="pug">
  .content
    .dashboard
      navigation-menu(v-if="showNavigationMenu")
      router-view
</template>

<script>
import NavigationMenu from '@/components/ui/NavigationMenu'
import { mapGetters } from 'vuex'

export default {
  name: 'application-panel',

  // redirect to '/login' when no user is logged in
  updated () {
    this.$store.dispatch('ui/load')
  },

  created () {
    this.$store.dispatch('ui/load')
  },

  computed: {
    ...mapGetters({ showNavigationMenu: 'ui/showNavigationMenu' })
  },

  components: {
    'navigation-menu': NavigationMenu
  }
}
</script>

<style lang="scss" scoped>
  .documentation {
    height: auto;
    min-height: calc(100% - 73px);
  }
</style>
