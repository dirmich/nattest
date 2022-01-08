<script>
import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  props: {
    chartData: {
      type: Object,
      default: () => {},
    },
    options: {
      type: Object,
      default: null,
    },
  },
  mounted() {
    this.renderChart(this.chartData, {
      responsive: true,
      maintainAspectRatio: false,
      ...this.options,
    })
  },
  watch: {
    chartData(val) {
      this.renderChart(val, {
        responsive: true,
        maintainAspectRatio: false,
        ...this.options,
      })
    },
  },
  methods: {},
}
</script>
