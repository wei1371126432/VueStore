
import Vue from 'vue'
import App from './App'
import router from './router'
import { Header } from 'mint-ui'
import '../static/mui/css/mui.css'
import '../static/mui/css/icons-extra.css'
Vue.component(Header.name, Header)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: c => c(App)
})
