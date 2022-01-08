const crypto = require('crypto-browserify')

Buffer.prototype.hex = function () {
  return this.toString('hex')
}

String.prototype.hex = function () {
  return Buffer.from(this, 'hex')
}

class KeyExClient {
  constructor(seed) {}

  static encodePassword = (passwd) => {
    return crypto.createHash('sha256').update(passwd).digest('hex')
  }

  generateShareKey() {
    this.sharekey = crypto.createECDH('secp256k1')
    return this.sharekey.generateKeys('hex')
  }
  initShareKey(skey) {
    this.sharekey = crypto.createECDH('secp256k1')
    this.sharekey.setPrivateKey(skey, 'hex')
  }

  computeShareKey(otherkey) {
    return this.sharekey.computeSecret(otherkey, 'hex')
  }

  encrypt(plain, key = null) {
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv('aes-256-gcm', key ? key : this.ck, iv)
    const enc = Buffer.concat([
      cipher.update(typeof plain === 'string' ? plain : JSON.stringify(plain)),
      cipher.final(),
    ])
    const auth = cipher.getAuthTag()
    return auth.hex() + iv.hex() + enc.hex()
  }

  decrypt(enctext, key = null) {
    const auth = enctext.substr(0, 32).hex()
    const iv = enctext.substr(32, 32).hex()
    const enc = enctext.substr(64).hex()
    const decipher = crypto.createDecipheriv(
      'aes-256-gcm',
      key ? key : this.ck,
      iv
    )
    decipher.setAuthTag(auth)
    const plain = Buffer.concat([decipher.update(enc), decipher.final()])
    return plain.toString()
  }
  generate64(seed) {
    let ret = crypto.createHash('sha512').update(seed).digest('hex')
    let key = ret.substring(0, ret.length / 2)
    let did = ret.substring(ret.length / 2)
    return { key, did }
  }

  share_update({ token, data }, seed = 'hello, this is a sample') {
    if (!token || !data) return null
    const k = this.sharekey
      ? this.sharekey.generateKeys('hex')
      : this.generateShareKey()
    const ck = this.computeShareKey(data)
    this.ck = ck
    const key = this.generate64(seed)
    console.log('key', key, seed)
    const calc = this.encrypt(key)
    return { token, seed: k, data: calc }
  }
  calc_share({ token, data }, senddata = {}) {
    if (!token || !data) return null
    const k = this.sharekey
      ? this.sharekey.generateKeys('hex')
      : this.generateShareKey()
    const ck = this.computeShareKey(data)
    this.ck = ck

    const calc = this.encrypt(senddata)
    return { token, seed: k, data: calc }
  }
}
export default KeyExClient
