<template>
  <div class="base">
    <el-container direction="vertical">
      <Nuxt />
    </el-container>
  </div>
</template>

<script>
// import kex from '~/utils/kexclient'
export default {
  async mounted() {
    // const c = new kex()
    // const zero = await this.$axios.get('/share')
    // let ret = await c.calc_share(zero, { a: 1, b: 2 })
    // ret = await this.$axios.post('/share', ret)
    // console.log(ret)
  },
}
</script>

<style lang="scss">
html {
  font-family: 'Nanum Gothic', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 0.9rem;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
body {
  margin: 0;
}
</style>
<style lang="scss" scoped>
.base {
  min-height: 100vh;

  .el-header {
    height: $headerHeight !important;
  }
  .el-aside {
    min-height: calc(100vh - $headerHeight);
  }
}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
