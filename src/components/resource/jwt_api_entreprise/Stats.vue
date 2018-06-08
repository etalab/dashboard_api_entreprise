<template lang="pug">
.main.stats
  a.back-button(@click="goToPreviousPage") ← Retour à la liste des tokens
  h2 {{jwtId}}
  stats-gauge
  endpoints-called(class="stats__call-count")
  response-code-ratio
  last-calls(class="stats__last-calls")
</template>

<script>
import EndpointsCalled from '@/components/resource/stats/EndpointsCalled'
import ResponseCodeRatio from '@/components/resource/stats/ResponseCodeRatio'
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
    'endpoints-called': EndpointsCalled,
    'last-calls': LastCalls,
    'response-code-ratio': ResponseCodeRatio,
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
