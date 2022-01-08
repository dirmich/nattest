import Vue from 'vue'
import { isMobile, parseBool } from '../utils/util'
import { throttle } from 'lodash'
export default function ({ store }) {
  const sidebar = store.state.showSidebar
  // const fixedHeader = parseBool(Cookies.get('fixedHeader'))

  // resize handle
  const onResize = throttle(() => {
    if (window.innerWidth < 768 && sidebar) {
      store.commit('showSidebar', false)
    } else if (window.innerWidth > 768 && !sidebar) {
      store.commit('showSidebar')
    }
    store.commit(`setDevice`, isMobile() ? 'mobile' : 'desktop')
  }, 100)
  window.addEventListener('resize', onResize)
  window.onNuxtReady(() => {
    onResize()
  })
  onResize()
}
