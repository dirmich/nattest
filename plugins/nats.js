import Vue from 'vue'
// import vueNats from 'vue-nats'
import { connect } from 'nats.ws/nats'

const vueNats = {
  install: (VueInst, opt = {}) => {
    const nats = connect(opt)
    VueInst.prototype.$nats = nats
    // VueInst.prototype.$indy = axiosref(cfg.INDYSERVER)
    // console.log('install axios', axios)
  },
}

Vue.use(vueNats, {
  url: 'ws://highmaru.com:4223',
  json: true,
  reconnect: true,
  maxReconnectAttempts: -1,
  reconnectTimeWait: 1000,
})
