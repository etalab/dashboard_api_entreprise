<template lang="pug">
.main-pane.stats
  .back-button Retour au profil
  h2 Token Name
  stats-table(class="stats__call-count" :items="calls")
  stats-table(class="stats__last-calls" :items="lastCalls")
  stats-histogram(:items="returnCodeRatio")
  stats-gauge(:data="callVolume")
</template>

<script>
import StatsTable from '@/components/resource/stats/Table'
import StatsHistogram from '@/components/resource/stats/Histogram'
import StatsGauge from '@/components/resource/stats/Gauge'
import { mapGetters } from 'vuex'

export default {
  name: 'stats-show',
  data () {
    return {
      // calls: 'lol'
      calls: {
        title: 'Nombre d’appels par endpoints',
        headers: ['endpoints', 'count'],
        timeSpans: [{
          label: '30 dernières heures',
          time: '30'
        }, {
          label: '8 derniers jours',
          time: '192' // 8 * 24 heures
        }],
        items: [{
          name: 'Etablissements',
          count: '12'
        }]
      },
      lastCalls: {
        title: 'Derniers appels',
        headers: ['url', 'params', 'code retour'],
        timeSpans: [],
        items: [{
          url: 'random/url',
          params: 'params',
          code: '404'
        }]
      },
      returnCodeRatio: {
        title: 'Pourcentage de code retour',
        headers: ['endpoints', 'count'],
        timeSpans: [{
          label: '30 dernières heures',
          time: '30'
        }, {
          label: '8 derniers jours',
          time: '192' // 8 * 24 heures
        }],
        data: {
          labels: ['Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche', 'Lundi', 'Mardi'],
          datasets: [
            {
              label: 'Pourcentage',
              backgroundColor: '#0081d5',
              data: [40, 20, 12, 39, 10, 40, 39, 80]
            }
          ]
        },
        options: {
          responsive: true
        },
        height: 200
      },
      callVolume: {
        title: 'Volume d’appels sur les 10 dernières minutes',
        volume: 80
      }
    }
  },
  components: {
    'statsTable': StatsTable,
    'statsHistogram': StatsHistogram,
    'statsGauge': StatsGauge
  }
}
</script>

<style lang="scss" scoped>
</style>
