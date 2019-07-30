import Vue from 'vue'
import app from './App.vue'
import VueRouter from 'vue-router'
import 'mint-ui/lib/style.css'
Vue.use(VueRouter)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: c => c(app)
})
