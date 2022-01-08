<template>
  <div class="hm_base" :style="style"><slot /></div>
</template>

<script>
export default {
  props: {
    center: {
      type: Boolean,
      default: false,
    },
    vcenter: {
      type: Boolean,
      default: false,
    },
    hcenter: {
      type: Boolean,
      default: false,
    },
    row: {
      type: Boolean,
      default: false,
    },
    fill: {
      type: Boolean,
      default: false,
    },
    fbox: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
    },
    height: {
      type: String,
    },
    debug: {
      type: Boolean,
      default: false,
    },
    alignH: {
      type: String,
      default: null,
    },
    alignV: {
      type: String,
      default: null,
    },
  },
  name: 'hm-flex',
  computed: {
    style() {
      const opt = {
        'flex-direction': this.row ? 'row' : 'column',
      }
      if (this.fbox) {
        opt['flex'] = 1
      }
      if (this.fill) {
        opt.width = '100%'
      }
      if (this.debug) {
        opt.border = 'tomato 1px solid'
      }
      if (this.center) {
        opt['justify-content'] = 'center'
        opt['align-items'] = 'center'
      } else {
        if (this.hcenter)
          opt[this.row ? 'justify-content' : 'align-items'] = 'center'
        if (this.vcenter)
          opt[this.row ? 'align-items' : 'justify-content'] = 'center'
        if (this.alignH)
          opt[this.row ? 'justify-content' : 'align-items'] = this.alignH
        if (this.alignV)
          opt[this.row ? 'align-items' : 'justify-content'] = this.alignV
      }
      if (this.height) opt['min-height'] = this.height
      if (this.color) opt['background-color'] = this.color
      return {
        ...opt,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.hm_base {
  display: flex;
}
</style>
