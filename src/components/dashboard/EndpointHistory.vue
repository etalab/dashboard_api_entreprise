<template lang="pug">
  .container
    <!--refresh-button(:lastRefreshTime="lastRefreshTime" @loadData="loadHistoricalData")-->
    h2 Historique

    endpoint-history-element(
      v-for="provider in providersHistory"
      :key="provider.id"
      :provider_name="provider.provider_name"
      :endpoints_availability_history="provider.endpoints_availability_history")

    br
</template>

<script>
import moment from 'moment'
import EndpointHistoryElement from '@/components/dashboard/EndpointHistoryElement'
import RefreshButton from '@/components/dashboard/RefreshButton'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('dashboard')

export default {
  name: 'endpoint-history',
  data () {
    return {
      lastRefreshTime: ''
    }
  },
  computed: {
    ...mapGetters(['providersHistory'])
  },
  methods: {
    loadHistoricalData: function () {
      let vm = this
      this.$store.dispatch('dashboard/providersHistory')
        .then(() => { vm.lastRefreshTime = moment().format('LTS') })
        .catch(error => console.trace(error.message))
    }
  },
  mounted: function () {
    this.loadHistoricalData()

    // setInterval(function () {
    //   this.loadHistoricalData()
    // }.bind(this), 60000)
  },
  components: {
    RefreshButton,
    EndpointHistoryElement
  }
}
</script>
