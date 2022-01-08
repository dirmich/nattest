import { local } from '~/utils/auth'
import cfg from '../config'

export const state = () => ({
  user: null,
})

export const getters = {
  user(state) {
    return state.user
  },
}

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
}

export const actions = {
  async setToken(ctx, token = null) {
    const { commit, state, dispatch } = ctx
    try {
      local.set('token', token)
      this._vm.$axios.setToken(token)
      commit('setToken', token)
      if (!token) {
        local.remove('token')
        commit('setUser', null)
      } else {
        const r = await this._vm.$axios.get('/info')
        commit('setUser', r.user)
        if (!r.user.super) {
          this._vm.$axios.defaults.baseURL = cfg.BASEURL
        } else {
          this._vm.$axios.defaults.baseURL = cfg.APISERVER
        }
        // if (!r.user.super) {
        //   this._vm.$axios({ url: 'user', baseURL: config.BASEURL })
        // }
      }
      return true
    } catch (e) {
      // console.log('login:', e?.toString())
      dispatch('logout')
      return false
    }
  },
}
