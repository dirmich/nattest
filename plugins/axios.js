import Vue from 'vue'
import axiosref from '../utils/axios'
import cfg from '../config'

// String.prototype.hexEncode = function () {
//   var hex, i

//   var result = ''
//   for (i = 0; i < this.length; i++) {
//     hex = this.charCodeAt(i).toString(16)
//     result += ('000' + hex).slice(-4)
//   }

//   return result
// }
const axios = axiosref(cfg.APISERVER)

const Axios = {
  install: (VueInst) => {
    VueInst.prototype.$axios = axios
    // VueInst.prototype.$indy = axiosref(cfg.INDYSERVER)
    // console.log('install axios', axios)
  },
}

Vue.use(Axios)
