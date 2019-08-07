
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import moment from 'moment'
import Mint from 'mint-ui'
import '../static/mui/css/mui.css'
import '../static/mui/css/icons-extra.css'
import VuePreview from 'vue2-preview'
Vue.use(VuePreview)
Vue.use(Mint)
Vue.use(VueResource)
Vue.filter('dateFormat', (dataStar, pattern = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(dataStar).format(pattern)
})
// 设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005/'
Vue.http.options.emulateJSON = true
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: c => c(App)
})
