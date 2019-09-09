<template lang="pug">
.panel
  .panel__header(v-if="items.title")
    .panel__header-content
      h3 {{ tableTitle }}
      //ul(v-if="items.timeSpans")
        li.stats__time-span(v-for="span in items.timeSpans" v-on:click="changeSpan(span.time)") {{ span.label }}
  table.table
    thead
      th(v-for="header in headers") {{item}}
    tbody
      tr(v-for="item in items")
        td(v-for="value in item") {{value}}
</template>

<script>
export default {
  name: "StatsTable",

  props: {
    items: {
      type: Object,
      default() {
        return {};
      }
    },
    headers: {
      type: Object,
      default() {
        return {};
      }
    },
    tableTitle: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  methods: {
    changeSpan: function() {
      // load new results
    }
  }
};
</script>

<style lang="scss" scoped></style>
