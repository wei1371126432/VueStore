<template>

  <div id="slider" class="mui-slider">
    <!-- 列表导航 -->
    <div id="sliderSegmentedControl"
      class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
      <div class="mui-scroll">
        <a :class="['mui-control-item' , item.id==0 ? 'mui-active' : '' ] " href="#item1mobile"
          data-wid="tab-top-subpage-1.html" v-for="item in cates" :key="item.id" @click="getPhotoListByCateId(item.id)">
          {{item.title}}
        </a>
      </div>
    </div>
    <ul class="photo-list">
      <!-- 图文列表 -->
      <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li">
        <img v-lazy="item.img_url">
        <div class="info">
          <h1 class="info-title">{{item.title}}</h1>
          <div class="info-body">{{item.zhaiyao}}</div>
        </div>
      </router-link>
    </ul>
  </div>

</template>
<script>
import mui from '../../../static/mui/js/mui.min.js'
export default {
  data () {
    return {
      cates: [],
      list: []
    }
  },
  created () {
    this.getAllCategory()
    this.getPhotoListByCateId(0)
  },
  mounted () {
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005
    })
  },
  methods: {
    getAllCategory () {
      // 图片分类列表展示
      this.$http.get('api/getimgcategory').then(res => {
        if (res.body.status === 0) {
          res.body.message.unshift({ title: '全部', id: 0 })
          this.cates = res.body.message
        }
      })
    },
    getPhotoListByCateId (cateId) {
      // 根据分类Id获取图片列表
      this.$http.get('api/getimages/' + cateId).then(res => {
        if (res.body.status === 0) {
          this.list = res.body.message
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
* {
  touch-action: pan-y;
}

.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li {
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 6px #999;
    border-radius: 3px;
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    .info {
      color: white;
      text-align: left;
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      max-height: 140px;
      .info-title {
        font-size: 14px;
      }
      .info-body {
        font-size: 13px;
      }
    }
  }
}
</style>
