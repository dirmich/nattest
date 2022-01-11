import {
  connect as nats_connect,
  JSONCodec,
  StringCodec,
} from 'nats.ws/nats.cjs'

class Nats {
  constructor(opt) {
    if (Nats.instance) {
      console.log('NATS] exist')
      return Nats.instance
    }
    Nats.instance = this
    this.option = {
      servers: ['wss://highmaru.com:4223'],
      reconnect: true,
      noEcho: true,
      maxReconnectAttempts: -1,
      reconnectTimeWait: 1000,
      timeout: 5000,
      ...opt,
    }
    this._subcriptions = []
  }
  async connect() {
    try {
      this.nc = await nats_connect(this.option)
      return !this.nc.isClosed()
    } catch (e) {
      console.error(e)
      return false
    }
  }
  isClosed() {
    return this.nc && this.nc.isClosed()
  }

  async close() {
    if (this.nc) {
      console.log('try close')
      try {
        await this.nc.drain()
        await this.nc.close()
        this.nc = null
      } catch (e) {
        console.log(e)
      }
    }
  }

  async sub(subject, handler) {
    if (!this.nc) await this.connect()
    const subscription = this.nc.subscribe(subject, {
      callback: (err, msg) => {
        if (err) {
        } else {
          console.log('R]', msg.data)
          const decoded =
            msg.data.length > 0 ? JSONCodec().decode(msg.data) : ''
          if (handler)
            handler(
              msg.subject,
              decoded,
              msg.reply
                ? (obj) => {
                    msg.respond(JSONCodec().encode(obj))
                  }
                : undefined
            )
        }
      },
    })
    this._subcriptions[subject] = subscription
  }

  async unsub(subject) {
    if (this._subcriptions[subject]) {
      this._subcriptions[subject].unsubscribe()
      delete this._subcriptions[subject]
    }
  }

  async pub(subject, payload) {
    if (!this.nc) await this.connect()
    const data =
      typeof payload === 'string'
        ? StringCodec().encode(payload)
        : JSONCodec().encode(payload)
    this.nc.publish(subject, data)
    return this.nc.flush()
  }

  async request(subject, payload) {
    if (!this.nc) await this.connect()
    const data =
      typeof payload === 'string'
        ? StringCodec().encode(payload)
        : JSONCodec().encode(payload)
    return this.nc.request(subject, data).then((m) => {})
  }
}

export default new Nats()
