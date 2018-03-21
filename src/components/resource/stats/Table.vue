<template lang="pug">
.panel
  .panel__header(v-if="items.title")
    .panel__header-content
      h3 {{ items.title }}
      ul(v-if="items.timeSpans")
        li.stats__time-span(v-for="span in items.timeSpans" v-on:click="changeSpan(span.time)") {{ span.label }}
  table
    thead
      th(v-for="item in items.headers") {{item}}
    tbody
      tr(v-for="item in items.items")
        td(v-for="value in item") {{value}}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'statsTable',
  props: ['items'],
  data () {
    return {
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
</style>
