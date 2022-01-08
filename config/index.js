const config = {
  development: {
    APISERVER: 'http://localhost:3001/admin',
    BASEURL: 'http://localhost:3001/user',
  },
  production: {
    APISERVER: 'https://smartfarms.cafe24.com:3000/admin',
    BASEURL: 'https://smartfarms.cafe24.com:3000/user',
    // APISERVER: 'https://farmapi.kakaolab.ml/admin',
    // BASEURL: 'https://farmapi.kakaolab.ml/user',
  },
  common: {
    FRONT: 'wrtc.kakaolab.ml',
    SECRET: 'Farm controllers, highmaru',
    HOST: 'smartfarms.cafe24.com',
    PORT: 3000,
  },
}
const env = process.env.NODE_ENV || 'development'
// console.log('[ENV]', env) //, { ...config.common, ...config[env] })
const dev = env === 'development'
// console.log({ dev, ...config.common, ...config[env] })
module.exports = { dev, ...config.common, ...config[env] }
