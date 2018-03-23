<template lang="pug">
.panel
  .panel__header
    .panel__header-content
      h3 Quantité d'appels (limite à 2000/10mn)
  .gauge(:style="{ 'width': quotaPercentage + '%'}")
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'statsGauge',

  computed: {
    ...mapGetters('stats', [
      'lastTenMinutesNumberCalls'
    ]),

    quotaPercentage () {
      return (this.lastTenMinutesNumberCalls / 2000 * 100)
    }
  }
}
</script>

<style lang="scss" scoped>
  .gauge {
    background: $color-blue;
    height: 30px;
    width: 100%;
  }
</style>
