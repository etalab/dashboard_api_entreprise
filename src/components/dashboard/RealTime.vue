<template>
  <div>
    <refresh-button :lastRefreshTime="lastRefreshTime" @loadData="loadData"></refresh-button>
    <h2 class="ui header">
      <i class="dashboard icon"></i>
      <div class="content">
        Endpoints
        <!-- <span data-tooltip="Infomartions basique qu'on peut mettre ici" data-position="top left"> -->
        <!-- <i class="help circle outline icon"></i> -->
        <!-- </span> -->
      </div>
    </h2>
    <p>Le service API Entreprise est: <span :class="[isUP ? 'up' : 'down']">{{ homepageStatus }}</span></p>
    <hr>
    <endpoints-table>
      <p slot="info-v2">Les données proviennent de <a href="https://entreprise.api.gouv.fr">entreprise.api.gouv.fr</a></p>
      <endpoint-row slot="v2"
                v-for="endpoint in endpointsV2"
                :key="endpoint.id"
                :name="endpoint.name"
                :sub_name="endpoint.sub_name"
                :code="endpoint.code"
                :timestamp="endpoint.timestamp">
      </endpoint-row>

      <div slot="info-v1">
        <p>Les données proviennent de <a href="https://apientreprise.fr">apientreprise.fr</a></p>

        <div class="ui negative message">
          <div class="header">
            Attention la v1 est dépréciée
          </div>
          <p>
            Coupure de la v1 au 31 mars 2018<br>
            La v1 sera coupée dans<span id="v1-countdown" class="bold"></span>
          </p>
        </div>
      </div>
      <endpoint-row slot="v1"
                v-for="endpoint in endpointsV1"
                :key="endpoint.id"
                :name="endpoint.name"
                :sub_name="endpoint.sub_name"
                :code="endpoint.code"
                :timestamp="endpoint.timestamp">
      </endpoint-row>

    </endpoints-table>

    <br>
  </div>
</template>

<script>
import moment from 'moment'
import 'jquery-countdown'
import EndpointRow from '@/components/dashboard/EndpointRow'
import EndpointsTable from '@/components/dashboard/EndpointsTable'
import RefreshButton from '@/components/dashboard/RefreshButton'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('dashboard')

export default {
  name: 'endpoints-view',
  data () {
    return {
      isUP: false,
      homepageStatus: 'DOWN',
      endpoints: [],
      lastRefreshTime: ''
    }
  },
  computed: {
    ...mapGetters(['realTime']),
    endpointsV1: function () {
      return this.endpoints.filter(function (e) { return e.api_version === 1 })
    },
    endpointsV2: function () {
      return this.endpoints.filter(function (e) { return e.api_version === 2 })
    }
  },
  methods: {
    loadData: function () {
      const vm = this
      this.$store.dispatch('dashboard/realTime')
        .then(response => { this.endpoints = response.data.results })
        .catch(() => {
          console.error('An error occured while retrieving the data')
          // TODO catch error ?
        })
      // this.$http.get('/dashboard/current_status')
      //   .then(response => {
      //     vm.endpoints = response.data.results
      //   }, error => {
      //     console.trace(error.message)
      //   })
      //
      // this.$http.get('/dashboard/homepage_status')
      //   .then(response => {
      //     if (response.data.results[0].code === 200) {
      //       vm.isUP = true
      //       vm.homepageStatus = 'UP'
      //     } else {
      //       vm.isUP = false
      //       vm.homepageStatus = 'DOWN'
      //     }
      //   }, error => {
      //     console.trace(error.message)
      //   })

      vm.lastRefreshTime = moment().format('LTS')
    }
  },
  mounted: function () {
    $('#v1-countdown').countdown('2018/03/31', function (event) {
      $(this).html(event.strftime(' %w semaines %d jours %H:%M:%S'))
    })

    this.loadData()

    // $('.menu .item').tab()

    setInterval(function () {
      this.loadData()
    }.bind(this), 60000)
  },
  components: {
    'endpoint-row': EndpointRow,
    'endpoints-table': EndpointsTable,
    'refresh-button': RefreshButton
  }
}
</script>

<style>
  .up {
    color: green;
    font-weight: bold;
  }
  .down {
    color: red;
    font-weight: bold;
  }
  .bold {
    font-weight: bold;
  }
</style>
