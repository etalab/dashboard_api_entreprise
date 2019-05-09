<template lang="pug">
.panel
  .panel__header
    .panel__header-content
      h3 {{ tableTitle }}
      ul(v-if="timeSpans")
        li.stats__time-span(v-for="time in timeSpans" v-on:click="changeSpan(time.value)" :class="{active:isSelected(time.value)}") {{ time.label }}
  table.table
    thead
      th(v-for="header in headers") {{ header }}
    tbody
      tr(v-for="item in endpointsDisplayed")
        td {{ item.name }}
        td {{ item.total }}
        td {{ item.percent_success }}%
        td {{ item.percent_not_found }}%
        td {{ item.percent_other_client_errors }}%
        td {{ item.percent_server_errors }}%

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'apis-usage',

  data () {
    return {
      tableTitle: 'Nombre d\'appels',
      headers: ['Endpoint', 'Total', '% succès', '% non trouvés', '% autres erreurs client', '% erreurs serveur'],
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
      'orderedApisUsage'
    ]),

    endpointsDisplayed () {
      let endpointsToDisplay = {}

      switch (this.timeSpanDisplayed) {
        case '10_minutes':
          if (this.orderedApisUsage.last_10_minutes) endpointsToDisplay = this.orderedApisUsage.last_10_minutes.by_endpoint
          break

        case '30_hours':
          if (this.orderedApisUsage.last_30_hours) endpointsToDisplay = this.orderedApisUsage.last_30_hours.by_endpoint
          break

        case '8_days':
          if (this.orderedApisUsage.last_8_days) endpointsToDisplay = this.orderedApisUsage.last_8_days.by_endpoint
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
