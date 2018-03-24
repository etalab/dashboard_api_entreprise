<template lang="pug">
  .side-pane
    ul.side-pane__menu
      li(v-for="(tile, index) in tiles" :key="index"  :route="tile.routeName" :icon="tile.icon" :class="{active:isSelected(tile.routeName)}")
        a.side-pane__link(@click="routeTo(tile.routeName)") {{ tile.label }}

</template>

<script>
export default {
  name: 'navigation-menu',

  // TODO move this into an ui store module
  data () {
    return {
      selected: 'client-view',
      tiles: [
        {
          label: 'Profil',
          routeName: 'client-view'
        },
        {
          label: 'Utilisateurs',
          routeName: 'users'
        },
        {
          label: 'Rôles',
          routeName: 'roles'
        }
      ]
    }
  },
  methods: {
    routeTo: function (routeName) {
      this.selected = routeName
      this.$router.push({ name: routeName })
    },
    isSelected: function (routeName) {
      return this.selected === routeName
    }
  }
}
</script>
