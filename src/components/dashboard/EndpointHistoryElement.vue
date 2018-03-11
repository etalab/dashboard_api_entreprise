<template lang="pug">
  div
    .panel
      <!--<span style="color:green;">UP</span>-->
      <!--<span style="color:yellow;">UP (fallback)</span>-->
      <!--<span style="color:orange;">INCOMPLETE</span>-->
      <!--<span style="color:red;">DOWN</span>-->
      <!--<span style="color:darkred;">DOWN (fallback)</span>-->
       h3 {{ provider_name.toUpperCase() }}
      <!-- <p>Disponibilité sur 7 jours: <span :class="slaRatingClass">{{ meanSla }}%</span></p> -->
      p(:id="provider_name")
        <!-- Visavail.js chart will be inserted here -->

    br
</template>

<script>
import * as d3 from 'd3'
import { visavailChart } from '@/assets/visavail/visavail.js'
require('@/assets/visavail/visavail.css')

export default {
  name: 'endpoint-history-element',
  props: ['provider_name', 'endpoints_availability_history'],
  computed: {
    meanSla: function () {
      let slaSum = 0
      let slaCount = 0
      this.endpoints_availability_history.forEach(function (ep) {
        slaSum += ep.sla
        slaCount++
      })

      return Number(slaSum / slaCount).toFixed(2)
    },
    dataset: function () {
      let dataset = []
      this.endpoints_availability_history.forEach(function (ep) {
        let computedName = ('v' + ep.api_version + ' ' + ep.name + ' ' + (ep.sub_name || '')).replace(/_/g, ' ')
        let availability = {
          'measure_html': '<div class="endpoint_label">' + computedName + '</div>',
          'categories': {
            '200': { color: '#5CB85C' },
            '206': { color: '#E3C567' },
            '212': { color: '#FE7F2D' },
            '500': { color: '#D9534D' },
            '512': { color: '#D8386D' }
          },
          'data': ep.availability_history
        }
        dataset.push(availability)
      })

      return dataset
    },
    slaRatingClass: function () {
      switch (true) {
        case (this.meanSla > 99.8):
          return 'perfect-sla'
        case (this.meanSla > 98):
          return 'almost-perfect-sla'
        default:
          return 'bad-sla'
      }
    }
  },
  mounted: function () {
    let chart = visavailChart().width(800)
    d3.select('#' + this.provider_name).datum(this.dataset).call(chart)
  }
}
</script>

<style>
  .perfect-sla {
    color: green;
    font-weight: bold;
  }
  .almost-perfect-sla {
    color: orange;
    font-weight: bold;
  }
  .bad-sla {
    color: red;
    font-weight: bold;
  }
  .endpoint_label {
    line-height: 100%;
  }
</style>
