<template>
  <v-list-tile @click="route_to(route)">
    <v-list-tile-content>
      <v-list-tile-title>
        {{ label }}
      </v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
export default {
  name: 'nav-menu-tile',
  props: ['label', 'route'],
  methods: {
    route_to: function (routeName) {
      this.$router.push({ name: routeName })
    }
  }
}
</script>
