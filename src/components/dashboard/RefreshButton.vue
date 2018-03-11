<template>
  <button class="ui labeled icon teal button right floated" @click="loadData">
    <i class="refresh icon"></i>
    Rafraichir (dernier: {{ lastRefreshTime }})
  </button>
</template>

<script>
export default {
  name: 'refresh-button',
  props: ['lastRefreshTime'],
  methods: {
    loadData: function () {
      this.$emit('loadData')
    }
  }
}
</script>
