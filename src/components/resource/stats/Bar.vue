<script>
import { Bar } from "vue-chartjs";

export default {
  name: "StatsBar",

  extends: Bar,

  props: {
    data: {
      type: Object,
      default() {
        return {};
      }
    },
    options: {
      type: Object,
      default() {
        return {};
      }
    }
  },

  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart(this.data, this.options);
  }
};
</script>
