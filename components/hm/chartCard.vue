<template>
  <div>
    <hm-card class="holder">
      <component
        :is="type"
        :chartData="data"
        :options="options"
        slot="content"
        class="linechart"
      />
    </hm-card>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    options: {
      type: Object,
      default: () => ({}),
    },
    pie: {
      type: Boolean,
      default: false,
    },
    bar: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  computed: {
    type() {
      return this.pie ? 'pie-chart' : this.bar ? 'bar-chart' : 'line-chart'
    },
  },
}
</script>

<style lang="scss" scoped>
.holder {
  position: relative;
  width: 100%;
  height: 300px;
  /* margin-bottom: 20px; */
}

.linechart {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* margin: auto; */
  height: 300px;
  /* width: 800px; */
  .chartjs-size-monitor {
  }
}
</style>
