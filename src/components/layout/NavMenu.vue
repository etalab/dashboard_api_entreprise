<template lang="pug">
  v-navigation-drawer(app)
    v-layout(column justify-space-between fill-height)
      v-list
        nav-menu-tile(v-for="(tile, index) in tiles" :key="index" :label="tile.label" :route="tile.routeName")

      v-list
        v-list-tile
          v-list-tile-content
            v-list-tile-title Administrateur
          v-list-tile-action
            v-btn(icon @click="logout")
              v-icon exit_to_app
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
          label: 'Rôles',
          routeName: 'roles'
        }
      ]
    }
  },

  methods: {
    logout () {
      this.$router.push({ name: 'logout' })
    }
  },

  components: {
    'nav-menu-tile': NavMenuTile
  }
}
</script>
