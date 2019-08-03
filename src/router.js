
import Vue from 'vue'
import VueRouter from 'vue-router'
import Member from './components/tabbar/MemberContainer'
import Search from './components/tabbar/SearchContainer'
import Shop from './components/tabbar/ShopCarContainer'
import Home from './components/tabbar/HomeContainer'
import NewsList from './components/news/NewsList'
import NewsInfo from './components/news/NewsInfo'
Vue.use(VueRouter)
export default new VueRouter({
  routes: [{
    path: '/home',
    component: Home
  },
  {
    path: '/shopcar',
    component: Shop
  },
  {
    path: '/member',
    component: Member
  },
  {
    path: '/search',
    component: Search
  },

  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home/newslist',
    component: NewsList
  },
  {
    path: '/home/newsinfo:id',
    component: NewsInfo
  }
  ],
  linkActiveClass: 'mui-active'
})
