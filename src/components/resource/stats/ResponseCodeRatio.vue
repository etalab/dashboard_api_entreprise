<template lang="pug">
.panel
  .panel__header
    .panel__header-content
      h3 {{ tableTitle }}
      ul(v-if="timeSpans")
        li.stats__time-span(v-for="time in timeSpans" v-on:click="changeSpan(time.value)") {{ time.label }}
  table
    thead
      th(v-for="header in headers") {{ header }}
    tbody
      tr(v-for="item in ratiosDisplayed")
        template(v-for="(value, key) in item")
          td {{ key }}
          td {{ value }}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'response-code-ratio',

  data () {
    return {
      tableTitle: 'Taux de réponse',
      headers: ['Code HTTP', 'Ratio'],
      timeSpans: [
        {
          label: '30 dernières heures',
          value: '30_hours'
        },
        {
          label: '8 derniers jours',
          value: '8_days'
        }
      ],
      timeSpanDisplayed: '30_hours'
    }
  },

  computed: {
    ...mapGetters('stats', [
      'responseCodeRatio'
    ]),

    ratiosDisplayed () {
      let ratiosToDisplay = {}

      switch (this.timeSpanDisplayed) {
        case '30_hours':
          if (this.responseCodeRatio.last_30_hours) ratiosToDisplay = this.responseCodeRatio.last_30_hours
          break

        case '8_days':
          if (this.responseCodeRatio.last_8_days) ratiosToDisplay = this.responseCodeRatio.last_8_days
          break
      }

      return ratiosToDisplay
    }
  },

  methods: {
    changeSpan: function (time) {
      this.timeSpanDisplayed = time
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
