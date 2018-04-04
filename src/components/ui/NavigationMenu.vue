<template lang="pug">
  .side-menu
    ul
      li(v-for="(tile, index) in tiles" :key="index"  :route="tile.routeName" :icon="tile.icon")
        a.side-pane__link(@click="routeTo(tile.routeName)"  :class="{active:isSelected(tile.routeName)}") {{ tile.label }}

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
