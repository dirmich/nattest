<template>
  <div :style="styles" :class="classes" class="v-offset">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    fullWidth: {
      type: Boolean,
      default: false,
    },
    offset: {
      type: [Number, String],
      default: 0,
    },
  },

  computed: {
    classes() {
      return {
        'v-offset--full-width': this.fullWidth,
      }
    },
    styles() {
      return {
        // position: 'absolute',
        // zIndex: '100',
        top: `-${this.offset}px`,
        marginTop: `-${this.offset}px`,
        // marginBottom: `-${this.offset}px`,
      }
    },
  },
}
</script>

<style>
.v-offset {
  display: inline-block;
  margin: 0 auto;
  /* max-width: calc(100% - 32px); */
  position: relative;
  box-shadow: 0 6px 6px -3px rgba(0, 0, 0, 0.2),
    0 10px 14px 1px rgba(0, 0, 0, 0.14), 0 4px 18px 3px rgba(0, 0, 0, 0.12);
}
.v-offset--full-width {
  max-width: 100%;
}
</style>
