import { local } from '~/utils/auth'
import cfg from '../config'

export const state = () => ({
  user: null,
  token: '',
})

export const getters = {
  isLogged(state) {
    return !!state.token
  },
  token(state) {
    return state.token
  },
  user(state) {
    return state.user
  },
  isSuper(state) {
    return state.user && state.user.super
  },
}

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  setToken(state, token) {
    state.token = token
  },
  setLogout(state) {
    state.user = null
    state.token = null
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
  async reload({ commit }) {
    try {
      const r = await this._vm.$axios.get('/info')
      commit('setUser', r.user)
    } catch (e) {
      console.log('reload:', e?.toString())
    }
  },
  async logout({ commit, dispatch, ...ctx }) {
    await this._vm.$axios.get(`/logout`)
    // console.log('logout!', this.$router.currentRoute)
    local.remove('token')
    this._vm.$axios.setToken(null)
    await commit('setLogout')
    if (this.$router.currentRoute.path !== '/')
      this.$router.replace({ path: '/', meta: { requireAuth: false } })
    else {
      // this._vm.$forceUpdate()
      this.$router.go()
    }
    // window.location = '/'
  },
}
