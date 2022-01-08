function access(storage) {
  return {
    get: (key) => storage.getItem(key),
    set: (key, val) => {
      storage.setItem(key, val)
    },
    remove: (key) => {
      storage.removeItem(key)
    },
  }
}
export const local = access(window.localStorage)
export const session = access(window.sessionStorage)
// export const local=()=>access(window.localStorage)
// export const session=()=>access(window.sessionStorage)
