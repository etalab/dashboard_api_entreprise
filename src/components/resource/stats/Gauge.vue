<template lang="pug">
.panel
  .panel__header
    .panel__header-content
      h3 Quantité d'appels (limite à 2000/10mn)
  .gauge-container
    .gauge(:style="{ 'width': quotaPercentage + '%'}")
     span(v-if="!isLessThanTen") {{lastTenMinutesNumberCalls}} / 2000
    span.count(v-if="isLessThanTen") {{lastTenMinutesNumberCalls}} / 2000

</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "StatsGauge",

  computed: {
    ...mapGetters("stats", ["lastTenMinutesNumberCalls"]),

    quotaPercentage() {
      return (this.lastTenMinutesNumberCalls / 2000) * 100;
    },
    isLessThanTen() {
      return this.quotaPercentage <= 10;
    }
  }
};
</script>

<style lang="scss" scoped>
.gauge-container {
  width: 100%;
  background-color: $color-lighter-grey;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.gauge {
  color: $color-white;
  background: $color-blue;
  height: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 3px 3px 0;
  white-space: nowrap;
}

.count {
  color: $color-blue;
  margin-left: 1em;
}
</style>
