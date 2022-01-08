<template>
  <div class="holder">
    {{ title }}
    <div class="divider" />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.holder {
  font-weight: bold;
  font-size: 1.2rem;
  color: #888888;
  margin: 1.2rem 0;
}
.divider {
  border-bottom: 1px solid darkgrey;
  margin: 1.2rem 0;
}
</style>
