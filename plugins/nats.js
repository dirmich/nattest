import Vue from 'vue'
import nats from '../utils/nats'

const vueNats = {
  install: async (VueInst, opt = {}) => {
    // const nats = await connect(opt)
    // const nats = new Nats(opt)
    VueInst.prototype.$nats = nats
    console.log('connected', nats.connect())
  },
}

Vue.use(vueNats, {
  // servers: ['wss://highmaru.com:4223'],
  // json: true,
  // reconnect: true,
  // maxReconnectAttempts: -1,
  // reconnectTimeWait: 1000,
})
