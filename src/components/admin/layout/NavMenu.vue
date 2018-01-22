<template lang="pug">
  v-navigation-drawer(app v-model="drawer")
    v-toolbar
      v-list
        v-list-tile
          v-list-tile-title.title Administration API Entreprise

    v-layout(column justify-space-between fill-height)
      v-list
        nav-menu-tile(v-for="(tile, index) in tiles" :key="index" :label="tile.label" :route="tile.routeName" :icon="tile.icon")

      v-list
        v-list-tile
          v-list-tile-content
            v-list-tile-title Administrateur
          v-list-tile-action
            v-btn(icon @click="logout")
              v-icon exit_to_app
</template>

<script>
import NavMenuTile from '@/components/admin/layout/NavMenuTile'

export default {
  name: 'nav-menu',

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

  props: ['drawer'],

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
