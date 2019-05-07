<template lang="pug">
.stats
  a.back-button(@click="goToPreviousPage") ← Retour à la liste des tokens
  h2 {{jwtId}}
  stats-gauge
  apis-usage(class="stats__call-count")
  last-calls(class="stats__last-calls")
</template>

<script>
import ApisUsage from '@/components/resource/stats/ApisUsage'
import LastCalls from '@/components/resource/stats/LastCalls'
import StatsGauge from '@/components/resource/stats/Gauge'
import { mapGetters } from 'vuex'

export default {
  name: 'jwt-stats',

  props: ['jwtId'],

  created: function () {
    this.$store.dispatch('stats/fetch', { jti: this.jwtId })
  },

  components: {
    'apis-usage': ApisUsage,
    'last-calls': LastCalls,
    'statsGauge': StatsGauge
  },

  methods: {
    goToPreviousPage: function () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
