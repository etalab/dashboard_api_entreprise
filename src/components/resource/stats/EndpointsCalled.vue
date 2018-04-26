<template lang="pug">
.panel
  .panel__header
    .panel__header-content
      h3 {{ tableTitle }}
      ul(v-if="timeSpans")
        li.stats__time-span(v-for="time in timeSpans" v-on:click="changeSpan(time.value)" :class="{active:isSelected(time.value)}") {{ time.label }}
  table
    thead
      th(v-for="header in headers") {{ header }}
    tbody
      tr(v-for="item in endpointsDisplayed")
        td {{ item.name }}
        td {{ item.total }}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'endpoints-called',

  data () {
    return {
      tableTitle: 'Nombre d\'appels',
      headers: ['Endpoint', 'Total'],
      timeSpans: [
        {
          label: '10 dernières minutes',
          value: '10_minutes'
        },
        {
          label: '30 dernières heures',
          value: '30_hours'
        },
        {
          label: '8 derniers jours',
          value: '8_days'
        }
      ],
      timeSpanDisplayed: '10_minutes'
    }
  },

  computed: {
    ...mapGetters('stats', [
      'endpointsCalled'
    ]),

    endpointsDisplayed () {
      let endpointsToDisplay = {}

      switch (this.timeSpanDisplayed) {
        case '10_minutes':
          if (this.endpointsCalled.last_10_minutes) endpointsToDisplay = this.endpointsCalled.last_10_minutes.by_endpoint
          break

        case '30_hours':
          if (this.endpointsCalled.last_30_hours) endpointsToDisplay = this.endpointsCalled.last_30_hours.by_endpoint
          break

        case '8_days':
          if (this.endpointsCalled.last_8_days) endpointsToDisplay = this.endpointsCalled.last_8_days.by_endpoint
          break
      }

      return endpointsToDisplay
    }
  },

  methods: {
    changeSpan: function (time) {
      this.timeSpanDisplayed = time
    },
    isSelected: function (time) {
      return this.timeSpanDisplayed === time
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
