<template lang="pug">
.panel
  .panel__header(v-if="data.title")
    .panel__header-content
      h3 {{ data.title }}
      ul(v-if="data.timeSpans")
        li.stats__time-span(v-for="span in data.timeSpans" v-on:click="changeSpan(span.time)") {{ span.label }}
  .gauge(:style="{ 'width': data.volume + '%'}")
</template>

<script>
export default {
  name: 'statsGauge',
  props: ['data'],
  data () {
    return {
      gaugeWidth: {
        width: this.data.volume
      }
    }
  },
  methods: {
    changeSpan: function (time) {
      console.log('pouet')
      // load new results
    }
  }
}
</script>

<style lang="scss" scoped>
  .gauge {
    background: $color-blue;
    height: 30px;
    width: 100%;
  }
</style>
