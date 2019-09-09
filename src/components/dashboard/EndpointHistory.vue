<template lang="pug">
  .section
    .container
      h2 Historique

      endpoint-history-element(
        v-for="provider in providersHistory"
        :key="provider.id"
        :provider_name="provider.provider_name"
        :endpoints_availability_history="provider.endpoints_availability_history")

      br
</template>

<script>
import EndpointHistoryElement from "@/components/dashboard/EndpointHistoryElement";
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("dashboard");

export default {
  name: "EndpointHistory",

  components: {
    EndpointHistoryElement
  },

  computed: {
    ...mapGetters(["providersHistory"])
  },

  mounted: function() {
    this.loadHistoricalData();
  },

  methods: {
    loadHistoricalData: function() {
      this.$store
        .dispatch("dashboard/providersHistory")
        .catch(error => console.trace(error.message));
    }
  }
};
</script>
