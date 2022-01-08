import axiosref from 'axios'

const common = {
  timeout: 60000,
}

const success = (config) => {
  // console.log('R]', config)
  return config.status === 200 ? config.data : Promise.reject(config.status)
}

const fail = (e) => {
  console.log('E]', e)
  // this.onError(e)
  return Promise.reject(e.response ? e.response.data : e.code)
}

export default (server, useDefault = true) => {
  const instance = axiosref.create({
    baseURL: `${server}`,
    ...common,
  })

  // instance.interceptors.request.use((config) => {
  //   console.log('S]', config)
  //   return config
  // })
  if (useDefault) instance.interceptors.response.use(success, fail)
  instance.setToken = (token) => {
    instance.defaults.headers.common['Authorization'] = token
      ? `Bearer ${token}`
      : ''
  }
  return instance
}
