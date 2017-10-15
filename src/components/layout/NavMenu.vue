<template lang="pug">
  v-navigation-drawer(app)
    v-list
      nav-menu-tile(v-for="(tile, index) in tiles" :key="index" :label="tile.label" :route="tile.routeName")
</template>

<script>
import NavMenuTile from '@/components/layout/NavMenuTile'

export default {
  name: 'nav-menu',

  data () {
    return {
      tiles: [
        {
          label: 'Utilisateurs',
          routeName: 'users'
        },
        {
          label: 'Roles',
          routeName: 'roles'
        }
      ]
    }
  },

  components: {
    'nav-menu-tile': NavMenuTile
  }
}
</script>
