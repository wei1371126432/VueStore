import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import moment from 'moment'
import Mint from 'mint-ui'
import '../static/mui/css/mui.css'
import '../static/mui/css/icons-extra.css'
import VuePreview from 'vue2-preview'
import Vuex from 'vuex'
Vue.use(Vuex)
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
// ========================设置vuex========================
var car = JSON.parse(localStorage.getItem('car') || '[]')
var store = new Vuex.Store({
  state: {
    car: car // 用来存储购物车中的商品数据
  },
  mutations: {
    // 点击加入购物车，将商品信息保存到car中
    addToCar (state, goodsinfo) {
      var carFlag = false
      state.car.some(item => { // 判断car中是否存在该商品，如果存在只需要添加商品的数量即可
        if (item.id === goodsinfo.id) {
          item.count += parseInt(goodsinfo.count)
          carFlag = true
          return true
        }
      })
      if (!carFlag) {
        state.car.push(goodsinfo)
      }
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsInfo (state, goodsinfo) {
      state.car.some(item => { // 判断car中是否存在该商品，如果存在只需要添加商品的数量即可
        if (item.id === goodsinfo.id) {
          item.count = goodsinfo.count
          return true
        }
      })
      // 数据更新完成后，再次保存到本地的localhost中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    removeFromCar (state, id) {
      // 删除购物车中的一项
      state.car.some((item, i) => {
        if (item.id === id) {
          state.car.splice(i, 1)
          return true
        }
      })
      // 数据删除完成后，再次保存到本地的localhost中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateSelected (state, info) {
      // 更新switch状态
      state.car.some((item) => {
        if (item.id === info.id) {
          item.selected = info.selected
          return true
        }
      })
      // switch状态更新完成后，再次保存到本地的localhost中
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: {// 相当于计算属性 也相当于filters
    getAllCount (state) {
      // 取购物车所有数量
      var c = 0
      state.car.forEach(item => {
        c += item.count
      })
      return c
    },
    getShopCarCount (state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.count
      })
      return o
    },
    getGoodsSelect (state) {
      var s = {}
      state.car.forEach(item => {
        s[item.id] = item.selected
      })
      return s
    },
    getGoodsCountAndAmount (state) {
      var m = {
        count: 0,
        amount: 0
      }
      state.car.forEach(item => {
        if (item.selected) {
          m.count += item.count
          m.amount += item.count * item.price
        }
      })
      return m
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: c => c(App)
})
