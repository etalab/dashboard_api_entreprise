<template lang="pug">
  div
    .panel
      h3 {{ provider_name.toUpperCase() }}
      .legend-label
        .square(:style="{ 'background-color': color_200 }")
        span UP

      .legend-label
        .square(:style="{ 'background-color': color_206 }")
        span UP mais réponse incomplète

      .legend-label
        .square(:style="{ 'background-color': color_500 }")
        span DOWN

      .legend-label(v-if="provider_name=='insee'")
        .square(:style="{ 'background-color': color_212 }")
        span UP (via API de secours)

      .legend-label(v-if="provider_name=='insee'")
        .square(:style="{ 'background-color': color_512 }")
        span DOWN (y compris API de secours)

      <!-- <p>Disponibilité sur 7 jours: <span :class="slaRatingClass">{{ meanSla }}%</span></p> -->
      p(:id="provider_name")
        <!-- Visavail.js chart will be inserted here -->

    br
</template>

<script>
import * as d3 from "d3";
import { visavailChart } from "@/assets/visavail/visavail.js";
require("@/assets/visavail/visavail.css");

export default {
  name: "EndpointHistoryElement",

  props: {
    providerName: {
      type: String,
      default: ""
    },
    endpointsAvailabilityHistory: {
      type: Array,
      default() {
        return [];
      }
    }
  },

  data: function() {
    return {
      color_200: "#5CB85C",
      color_206: "#E3C567",
      color_212: "#FE7F2D",
      color_500: "#D9534D",
      color_512: "#D8386D"
    };
  },

  computed: {
    meanSla: function() {
      let slaSum = 0;
      let slaCount = 0;
      this.endpoints_availability_history.forEach(function(ep) {
        slaSum += ep.sla;
        slaCount++;
      });

      return Number(slaSum / slaCount).toFixed(2);
    },
    dataset: function() {
      let dataset = [];
      let vm = this;
      this.endpoints_availability_history.forEach(function(ep) {
        let computedName = (
          "v" +
          ep.api_version +
          " " +
          ep.name +
          " " +
          (ep.sub_name || "")
        ).replace(/_/g, " ");
        let availability = {
          measure_html:
            '<div class="endpoint_label">' + computedName + "</div>",
          categories: {
            "200": { color: vm.color_200 },
            "206": { color: vm.color_206 },
            "212": { color: vm.color_212 },
            "500": { color: vm.color_500 },
            "512": { color: vm.color_512 }
          },
          data: ep.availability_history
        };
        dataset.push(availability);
      });

      return dataset;
    },
    slaRatingClass: function() {
      switch (true) {
        case this.meanSla > 99.8:
          return "perfect-sla";
        case this.meanSla > 98:
          return "almost-perfect-sla";
        default:
          return "bad-sla";
      }
    }
  },

  mounted: function() {
    let chart = visavailChart().width(800);
    d3.select("#" + this.provider_name)
      .datum(this.dataset)
      .call(chart);
  }
};
</script>

<style lang="scss">
.legend-label {
  display: inline-flex;
  margin-right: 30px;
}
.square {
  height: 15px;
  width: 15px;
  margin-top: 2px;
  margin-right: 3px;
}
.perfect-sla {
  color: $color-green;
  font-weight: bold;
}
.almost-perfect-sla {
  color: $color-orange;
  font-weight: bold;
}
.bad-sla {
  color: $color-red;
  font-weight: bold;
}
.endpoint_label {
  line-height: 100%;
}
</style>
