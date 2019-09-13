<template lang="pug">
.panel
  .panel__header(v-if="items.title")
    .panel__header-content
      h3 {{ items.title }}
      ul(v-if="items.timeSpans")
        li.stats__time-span(v-for="span in items.timeSpans" v-on:click="changeSpan(span.time)") {{ span.label }}
  stats-bar(:data="items.data" :options="items.options" :height="items.height")
</template>

<script>
import StatsBar from "@/components/resource/stats/Bar";

export default {
  name: "StatsHistogram",

  props: {
    items: {
      type: Object,
      default() {
        return {};
      }
    }
  },

  data() {
    return {};
  },

  methods: {
    changeSpan: function() {
      // load new results
    }
  },

  components: {
    statsBar: StatsBar
  }
};
</script>
