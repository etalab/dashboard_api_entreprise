<template lang="pug">
.stats
  a.back-button(@click="goToPreviousPage") ← Retour à la liste des tokens
  h2.main-title {{ jwtSub }}
    .label JTI : {{ jwtId }}
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

  props: {
    jwtId: {
      type: String,
      default: ""
    },
    jwtSub: {
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
  },

  components: {
    "apis-usage": ApisUsage,
    "last-calls": LastCalls,
    statsGauge: StatsGauge
  }
};
</script>

<style lang="scss" scoped>
.label {
  background-color: $color-white;
  border: 1px solid $color-light-grey;
  margin-left: 0.5em;
  font-family: "Source Sans Pro";
  font-weight: 400;
  font-size: 0.75em;
}
</style>
