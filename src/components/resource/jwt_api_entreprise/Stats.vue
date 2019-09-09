<template lang="pug">
.stats
  a.back-button(@click="goToPreviousPage") ← Retour à la liste des tokens
  h2 {{jwtId}}
  stats-gauge
  apis-usage(class="stats__call-count")
  last-calls(class="stats__last-calls")
</template>

<script>
import ApisUsage from "@/components/resource/stats/ApisUsage";
import LastCalls from "@/components/resource/stats/LastCalls";
import StatsGauge from "@/components/resource/stats/Gauge";

export default {
  name: "JwtStats",

  components: {
    "apis-usage": ApisUsage,
    "last-calls": LastCalls,
    statsGauge: StatsGauge
  },

  props: {
    jwtId: {
      type: String,
      default: ""
    }
  },
  created: function() {
    this.$store.dispatch("stats/fetch", { jti: this.jwtId });
  },

  methods: {
    goToPreviousPage: function() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped></style>
