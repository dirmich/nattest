export const state = () => ({
  showSidebar: false,
  device: 'mobile',
  fixedHeader: true,
})

export const getters = {
  isOpen(state) {
    return state.showSidebar
  },
  isMobile(state) {
    return state.device === 'mobile'
  },
  isFixed(state) {
    return state.fixedHeader
  },
}

export const mutations = {
  showSidebar(state, bShow = true) {
    state.showSidebar = bShow
  },
  toggleSidebar(state) {
    state.showSidebar = !state.showSidebar
  },
  setDevice(state, device) {
    state.device = device
  },
}

export const actions = {
  async init({ commit, state, dispatch, ...ctx }) {
    // await dispatch('farm/reload', { global: true })
  },
}
