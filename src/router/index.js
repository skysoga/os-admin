import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './routes'

// install route
Vue.use(VueRouter)

// create router
const router = new VueRouter({
  base: process.env.BASE_PATH,
  routes,
  mode: 'history',
  saveScrollPosition: true,
  linkActiveClass: 'active'
})


//router.beforeEach((to, from, next) => {
//if (to.meta.requireAuth) {
//  console.log(router)
//  next()
//} else {
//}
//if (to.path === '/') {
//  router.app.authenticating = true
//  setTimeout(() => {
//    router.app.authenticating = false
//    window.alert('this route is forbidden by a global before hook')
//    next(false)
//  }, 8080)
//} else {
//  next()
//}
//})

export default router
