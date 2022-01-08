import { local } from '~/utils/auth'

export default async function (ctx) {
  const { store, query, redirect } = ctx
  let token = local.get('token')
  const stoken = store.state.auth.token
  if (!stoken || stoken == '') {
    if (!token) {
      // console.log('checklogin: req', query)
      token = query.token
      if (token) {
        // console.log('Token:', token)
        local.set('token', token)
        const ret = await store.dispatch('auth/setToken', token)
        await store.dispatch('farm/reload')
        redirect('/')
      } else {
        redirect({ path: '/login', meta: { requireAuth: false } })
      }
    } else {
      if (query.token) {
        local.set('token', query.token)
        token = query.token
      }
      const ret = await store.dispatch('auth/setToken', token)
      // console.log('Token:', ret, token, query.token)
      await store.dispatch('farm/reload')

      // if (!ret) {
      //   await store.dispatch('auth/logout')
      // }
    }
  }
  const isSuper = ctx.store.getters['auth/isSuper']
  if (ctx.route) {
    if (isSuper && ctx.route.name[0] === 'u') redirect('/amain')
    if (!isSuper && ctx.route.name[0] !== 'u') redirect('/umain')
  }
}
// function checklogin() {
//   if (this.$route.query) {
//     let token = this.$route.query.token;
//     if (token) {
//       console.log("Token:", token);
//       local.set("token", token);
//       this.$store.commit("auth/setToken", token);
//       // this.$router.push('/user')
//       let to = this.$route.query.to;
//       if (to) {
//         this.$router.push(to);
//       }
//     } else {
//       // token = localStorage.getItem('token')
//       token = local.get("token");
//       if (token) {
//         this.$store.commit("auth/setToken", token);
//       } else {
//         // this.$router.push('/login')
//       }
//     }
//   } else {
//   }
// }
