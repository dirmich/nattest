<template>
  <div class="hm_container" :style="style">
    <slot />
  </div>
</template>

<script>
/*
    <hm-container>
        <children ... >
    </hm-container>

    children can us flex:1 ...
    'full' in root container means fulfill screen
    'full' in child container means fulfill rest of fixed contents
*/
export default {
  props: {
    padding: {
      type: String,
      default: '0px',
    },
    row: {
      type: Boolean,
      default: false,
    },
    fill: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
    },
    debug: {
      type: Boolean,
      default: false,
    },
    header: {
      type: String,
      default: '0px',
    },
  },
  name: 'hm-container',
  methods: {
    isInside() {
      let p = this.$parent
      while (p) {
        if (p.$options.name === 'hm-container') return true
        p = p.$parent
      }
      return false
    },
  },
  computed: {
    style() {
      const opt = {
        padding: this.padding,
        'flex-direction': this.row ? 'row' : 'column',
        height: this.fill
          ? this.isInside()
            ? '100%'
            : `calc(100vh - ${this.header})`
          : undefined,
        'background-color': this.color ? this.color : undefined,
      }
      if (this.debug) {
        opt.border = 'tomato 1px solid'
      }

      return opt
    },
  },
}
</script>

<style lang="scss" scoped>
.hm_container {
  /* text-align: justify;
  text-align: center; */
  display: flex;
  flex-direction: column;
  overflow: auto;
  width: 100% !important;
  /* height: 100vh; */
  /* padding: 10px;
  border-style: solid;
  border-width: 1px;
  border-color: red; */
}
</style>
