<template>
  <div>
    <div v-if="connected">Connected</div>
    <div
      v-for="(m, idx) in messages"
      class="message"
      :class="[{ reply: m.reply }]"
    >
      <div class="header">{{ m.subject }}</div>
      <div class="h3">{{ m.time }}</div>
    </div>
  </div>
</template>

<script>
export default {
  async mounted() {
    // this.nc = await connect({
    //   servers: ['highmaru.com:4222'],
    // })
    // this.connected = true
    // const sub = this.nc.subscribe('>')
    // for await (const m of sub) {
    //   this.messages.push(m)
    // }
    // this.$nats.subscribe('>', (event) => {
    //   console.log('Server reading:', event)
    // })
  },
  data() {
    return {
      nc: null,
      messages: [],
      connected: false,
    }
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.message {
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
  border: 1px solid green;
}
.message .reply {
  border-left: 5px solid green;
}
.message h3 {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
