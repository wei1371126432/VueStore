<template>
  <div>
    <!-- 轮播图 -->
    <swiper :LunboList="Lunbolist" :isfull="true"></swiper>
    <!-- 九宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../images/menu1.png" alt="">
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photoslist">
          <img src="../../images/menu2.png" alt="">
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodslist">
          <img src="../../images/menu3.png" alt="">
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img src="../../images/menu4.png" alt="">
          <div class="mui-media-body">留言反馈</div>
        </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img src="../../images/menu5.png" alt="">
          <div class="mui-media-body">视频专区</div>
        </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img src="../../images/menu6.png" alt="">
          <div class="mui-media-body">联系我们</div>
        </a></li>
    </ul>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
import swiper from '../subcomponents/Swiper'
export default {
  data () {
    return {
      Lunbolist: []
    }
  },
  created () {
    this.getLunbo()
  },
  methods: {
    getLunbo () {
      this.$http.get('api/getlunbo').then(result => {
        if (result.body.status === 0) {
          this.Lunbolist = result.body.message
        } else {
          Toast('轮播图请求数据错误')
        }
      })
    }
  },
  components: {swiper}
}
</script>
<style scoped>
.mui-grid-view.mui-grid-9 {
  background-color: #fff;
}
.mui-grid-view.mui-grid-9 img {
  width: 60px;
  height: 60px;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: none;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell .mui-media-body {
  font-size: 13px;
}
</style>
