<template lang="pug">
  v-list-tile(@click="routeTo(route)")
    v-list-tile-content
      v-list-tile-title {{ label }}
</template>

<script>
export default {
  name: 'nav-menu-tile',
  props: ['label', 'route'],
  methods: {
    routeTo: function (routeName) {
      this.$router.push({ name: routeName })
    }
  }
}
</script>
