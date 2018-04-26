<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  name: 'statsBar',
  props: ['data', 'options'],
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart(this.data, this.options)
  }
}
</script>
