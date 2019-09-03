<template lang="pug">
  tr
    td {{ name }}
    td(:class="statusClass") {{ status }}
    td {{ timestampMoment(timestamp) }}
</template>

<script>
import moment from "moment";
import "@/assets/moment-fr.js";

export default {
  name: "Endpoint",
  props: ["name", "code", "timestamp"],
  data() {
    return {
      status: "",
      statusClass: ""
    };
  },
  created: function() {
    switch (this.code) {
      case 200:
        this.status = "UP";
        this.statusClass = "success";
        break;
      case 206:
        this.status = "INCOMPLETE";
        this.statusClass = "warning";
        break;
      default:
        this.status = "DOWN";
        this.statusClass = "error";
        break;
    }
  },
  methods: {
    timestampMoment: function(timestamp) {
      return moment(timestamp).fromNow();
    }
  }
};
</script>

<style lang="scss" scoped>
.success {
  color: $color-green;
}
.error {
  color: $color-red;
}
.warning {
  color: $color-orange;
}
</style>
