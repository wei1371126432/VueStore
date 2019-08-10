<template>
  <div class="goodsinfo-container">
    <!-- 购物车小球 -->
    <transition @before-enter='beforeEnter' @enter='enter' @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball">
      </div>
    </transition>
    <!-- 轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :LunboList="lunbotu"></swiper>
        </div>
      </div>
    </div>
    <!--  商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header shop-title">{{goodsinfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：<del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价：<span
              class="now_price">￥{{goodsinfo.sell_price}}</span>
          </p>
          <p>购买数量:<numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>
    <!--  商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{goodsinfo.goods_no}}</p>
          <p>库存情况：{{goodsinfo.stock_quantity}}件</p>
          <p>上架时间：{{goodsinfo.add_time|dateFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <br>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import swiper from '../subcomponents/Swiper'
import numbox from '../subcomponents/goodsinfo_numbox'
export default {
  data () {
    return {
      id: this.$route.params.id, // 获取路由参
      lunbotu: [], // 获取轮播图
      goodsinfo: {}, // 获取商品信息
      ballFlag: false, // 控制小球隐藏和显示的变量
      selectedCount: 1
    }
  },
  created () {
    this.getLunbotu()
    this.getGoodsInfo()
  },
  methods: {
    getLunbotu () {
      // 获取轮播图属性
      this.$http.get('api/getthumimages/' + this.id).then(res => {
        if (res.body.status === 0) {
          res.body.message.forEach(item => {
            item.img = item.src
          })
          this.lunbotu = res.body.message
        }
      })
    },
    getGoodsInfo () {
      // 获取商品参数
      this.$http.get('api/goods/getinfo/' + this.id).then(res => {
        if (res.body.status === 0) {
          this.goodsinfo = res.body.message[0]
        }
      })
    },
    goDesc (id) {
      // 商品图文详情
      this.$router.push({ name: 'goodsdesc', params: { id } })
    },
    goComment (id) {
      // 商品评论详情
      this.$router.push({ name: 'goodscomment', params: { id } })
    },
    addToShopCar () {
      // 添加购物车的函数
      this.ballFlag = !this.ballFlag
      // 拼接出要加入到购物车当中的对象
      var goodsinfo = {
        id: this.id,
        count: this.selectedCount,
        price: this.goodsinfo.sell_price,
        selected: true
      }
      this.$store.commit('addToCar', goodsinfo)
    },
    beforeEnter (el) {
      el.style.transform = 'translate(0,0)'
    },
    enter (el, done) {
      // 获取小球在页面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect()
      const badgePosition = document.getElementById('badge').getBoundingClientRect()
      const xDist = badgePosition.left - ballPosition.left
      const yDist = badgePosition.top - ballPosition.top
      el.offsetWidth
      el.style.transform = `translate(${xDist}px, ${yDist}px)`
      el.style.transition = 'all 0.5s ease'
      done()
    },
    afterEnter (el) {
      this.ballFlag = !this.ballFlag
    },
    getSelectedCount (count) {
      // 获取numbox的数量到购物车
      if (count > this.goodsinfo.stock_quantity) {
        this.selectedCount = this.goodsinfo.stock_quantity
      } else {
        this.selectedCount = count
      }
    }
  },
  components: {
    swiper,
    numbox
  }
}
</script>
<style lang="less" scoped>
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;
  .now_price {
    color: red;
    font-size: 16px;
    font-weight: 550;
  }
  .mui-card-footer {
    display: block;
  }
  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    top: 409px;
    left: 137px;
    z-index: 999;
  }
}
</style>
