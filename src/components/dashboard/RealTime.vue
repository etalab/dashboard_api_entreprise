<template lang="pug">
  .section
    .container
      h2 Endpoints
      .panel
        p Le service API Entreprise est :&nbsp;
          span(class="status" :class="homepageStatus") {{ homepageStatus }}

        p Les données proviennent de&nbsp;
          a(href="https://entreprise.api.gouv.fr") entreprise.api.gouv.fr

        table.table
          thead
            tr
              th Endpoint
              th Status
              th Dernier appel

          tbody
          endpoint-row(
                       v-for="endpoint in endpointsV2"
                       :key="endpoint.id"
                       :name="endpoint.name"
                       :sub_name="endpoint.sub_name"
                       :code="endpoint.code"
                       :timestamp="endpoint.timestamp")

      br
</template>

<script>
import EndpointRow from "@/components/dashboard/EndpointRow";
import { createNamespacedHelpers } from "vuex";

const { mapGetters } = createNamespacedHelpers("dashboard");

export default {
  name: "EndpointsView",

  computed: {
    ...mapGetters(["endpoints", "homepageCode"]),
    endpointsV2: function() {
      return this.endpoints.filter(function(e) {
        return e.api_version === 2;
      });
    },
    homepageStatus: function() {
      return this.homepageCode === 0
        ? "waiting..."
        : this.homepageCode === 200
        ? "up"
        : "down";
    }
  },

  mounted: function() {
    this.loadData();
  },

  methods: {
    loadData: function() {
      this.$store
        .dispatch("dashboard/endpoints")
        .catch(error => console.log(error.message));

      this.$store
        .dispatch("dashboard/homepageCode")
        .catch(error => console.log(error.messsage));
    }
  },

  components: {
    "endpoint-row": EndpointRow
  }
};
</script>

<style lang="scss">
.no_margin {
  margin: 0;
}
.status {
  text-transform: uppercase;
  font-weight: bold;
}
.up {
  color: $color-green;
}
.down {
  color: $color-red;
}
.waiting\.\.\. {
  color: $color-orange;
}
.bold {
  font-weight: bold;
}
</style>
