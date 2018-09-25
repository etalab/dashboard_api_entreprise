<template lang="pug">
  .side-menu
    ul
      li(v-for="(tile, index) in tiles" :key="index"  :route="tile.routeName" :icon="tile.icon")
        router-link(class="side-pane__link" :to="{name:tile.routeName}") {{ tile.label }}
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

<style lang="scss" scoped>
  .dashboard .side-menu a {
    text-decoration: none;
  }

  .dashboard .side-menu a.router-link-active {
    background: linear-gradient(90deg, $color-blue, $color-blue 5px, $color-lighter-grey 0, $color-lighter-grey);
  }
</style>
