<template lang="pug">
  v-list-tile(avatar @click="routeTo(route)")
    v-list-tile-avatar
      v-icon {{ icon }}
    v-list-tile-content
      v-list-tile-title {{ label }}
</template>

<script>
export default {
  name: 'nav-menu-tile',
  props: ['label', 'icon', 'route'],
  methods: {
    routeTo: function (routeName) {
      this.$router.push({ name: routeName })
    }
  }
}
</script>
