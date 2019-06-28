import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main-page',
      component: require('@/views/MainPage').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
