import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(Element, { locale })

const default_options = {
  close: false,
  stick: true,
}

const open = function (title, message, opt) {
  const atitle = message && typeof message === 'string' ? title : '확인'
  const amessage = message && typeof message === 'string' ? message : title
  const optornot = message && typeof message === 'object' ? message : {}
  const aoptions = { ...default_options, ...opt, ...optornot }
  // console.log('open', this, title, message, opt)
  return this.$msgbox({
    title: atitle,
    message: amessage,
    dangerouslyUseHTMLString: true,
    showCancelButton: aoptions.close,
    closeOnPressEscape: !aoptions.stick,
    closeOnClickModal: !aoptions.stick,
    confirmButtonText: '확인',
    cancelButtonText: '취소',
    showClose: false,
  })
    .then((r) => ({ status: true, data: r }))
    .catch(() => ({ status: false }))
}

const Alert = {
  install: (VueInst, options) => {
    VueInst.prototype.alert = open
    VueInst.prototype.confirm = (...param) =>
      VueInst.prototype.alert(...param, { close: true })
  },
}

Vue.use(Alert)
