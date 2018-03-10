<template>
  <div>
    <refresh-button :lastRefreshTime="lastRefreshTime" @loadData="loadHistoricalData"></refresh-button>
    <h2 class="ui header">
      <i class="world icon"></i>
      <div class="content">
        Historique
        <!-- <span data-tooltip="Infomartions basique qu'on peut mettre ici" data-position="top left"> -->
        <!-- <i class="help circle outline icon"></i> -->
        <!-- </span> -->
      </div>
    </h2>

    <hr>

    <endpoint-history-element
      v-for="provider in providersHistory"
      :key="provider.id"
      :provider_name="provider.provider_name"
      :endpoints_availability_history="provider.endpoints_availability_history">
    </endpoint-history-element>

    <br>
  </div>
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

    setInterval(function () {
      this.loadHistoricalData()
    }.bind(this), 60000)
  },
  components: {
    RefreshButton,
    EndpointHistoryElement
  }
}
</script>
