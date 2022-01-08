<template>
  <div>
    <el-row type="flex">
      <el-button @click="toggle">{{
        subscribe ? 'Unsubscribe' : 'Subscribe'
      }}</el-button>
      <el-button
        @click="
          $nats.close()
          subscribe = false
        "
        >{{ $nats.isClosed() ? 'Open' : 'Close' }}</el-button
      >
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="6">
        <div
          v-for="(m, idx) in messages"
          class="message"
          :class="{ reply: m.respond !== null }"
        >
          <div class="header">{{ m.subject }}</div>
          <div class="time">{{ m.time }}</div>
        </div>
      </el-col>
    </el-row>
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
    // this.$nats.subscribe('>', {
    //   callback: (e, msg) => {
    //     console.log('Server reading:', msg)
    //   },
    // })
  },
  data() {
    return {
      nc: null,
      messages: [],
      connected: false,
      subscribe: false,
    }
  },
  methods: {
    toggle() {
      if (this.subscribe) {
        this.$nats.unsub('>')
      } else {
        this.$nats.sub('>', this.onMsg)
      }
      this.subscribe = !this.subscribe
    },
    async onMsg(subject, data, respond) {
      console.log('Recv:', subject, data)
      this.messages.push({
        subject,
        data,
        respond,
        time: new Date(),
      })
      switch (subject) {
        case 'calc.add':
          {
            const result = data.a + data.b
            if (respond) respond({ result })
          }
          break
        case 'calc.sub':
          {
            const result = data.a - data.b
            if (respond) respond({ result })
          }
          break
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.message {
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
  border: 1px solid green;
  .header {
    display: flex;
    font-weight: bold;
    font-size: 1.2rem;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  &.reply {
    border-left: 5px solid green;
  }
  .time {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;
  }
}
</style>
