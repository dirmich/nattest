<template>
  <el-row class="pItem" type="flex" align="middle">
    <span class="name">{{ name }}</span>
    <span class="value">{{ value.toString() }}</span>
    <div class="status" :class="getClass" />
  </el-row>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: '',
    },
    warn: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String | Number,
      default: '',
    },
  },
  computed: {
    getClass() {
      const opt = {}
      if (this.warn) opt.warn = true
      else if (this.error) opt.danger = true
      else opt.normal = true
      return opt
    },
  },
}
</script>

<style lang="scss" scoped>
.pItem {
  font-size: 0.8rem;
  padding: 4px;

  .name {
    min-width: 25px;
    /* flex: 2; */
    font-weight: bold;
  }
  .value {
    min-width: 40px;
    /* width: 30%; */
    /* flex: 2; */
    /* text-align: right; */
  }
}
.status {
  flex: 1;
  margin: 0 5px;
  width: 40%;
  height: 5px;
  border-radius: 2px;
}

.normal {
  background-color: $color-success;
}
.warn {
  background-color: $color-warning;
}
.danger {
  background-color: $color-danger;
}
</style>
