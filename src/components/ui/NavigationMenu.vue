<template lang="pug">
  .side-pane
    ul.side-pane__menu
      li(v-for="(tile, index) in tiles" :key="index"  :route="tile.routeName" :icon="tile.icon")
        a.side-pane__link(@click="routeTo(tile.routeName)") {{ tile.label }}

</template>

<script>
export default {
  name: 'navigation-menu',

  // TODO move this into an ui store module
  data () {
    return {
      tiles: [
        {
          label: 'Utilisateurs',
          routeName: 'users',
          icon: 'supervisor_account'
        },
        {
          label: 'Rôles',
          routeName: 'roles',
          icon: 'enhanced_encryption'
        }
      ]
    }
  },
  methods: {
    routeTo: function (routeName) {
      this.$router.push({ name: routeName })
    }
  }
}
</script>
