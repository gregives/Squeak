import Vue from 'vue'
import axios from 'axios'

import BootstrapVue from 'bootstrap-vue'
import './assets/sass/custom.sass'

import App from './App'
import router from './router'
import store from './store'

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faCaretUp, faCaretDown, faTrash
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faCaretUp, faCaretDown, faTrash
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(BootstrapVue)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
