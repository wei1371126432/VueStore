<template>
  <div class="photoinfo-container">
    <h3> {{photoinfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间：{{photoinfo.add_time|dateFormat}}</span>
      <span>点击次数：{{photoinfo.click+18}}</span>
    </p>
    <hr>
    <!-- 缩略图 -->
    <div class="thumbs">
<vue-preview :list="list" :thumbImageStyle="{width: '80px', height: '80px', margin: '10px'}"
      :previewBoxStyle="{border: '1px solid #eee'}" :tapToClose="true" @close="closeHandler"
      @destroy="destroyHandler" />
    </div>

    <!-- 图片内容 -->
    <div class="content" v-html="photoinfo.content">

    </div>
    <!-- 放置一个现成的评论子组件 -->
    <cmt-box :id="id"></cmt-box>
  </div>
</template>
<script>
import comment from '../subcomponents/comment.vue'
export default {
  data () {
    return {
      list: [
      ], // 缩略图数组
      id: this.$route.params.id,
      photoinfo: {}
    }
  },
  created () {
    this.getPhotoInfO()
    this.getThumbs()
  },
  methods: {
    getPhotoInfO () {
      this.$http.get('api/getimageInfo/' + this.id).then(res => {
        if (res.body.status === 0) {
          this.photoinfo = res.body.message[0]
        }
      })
    },
    getThumbs () {
      this.$http.get('api/getthumimages/' + this.id).then(res => {
        if (res.body.status === 0) {
          // 循环图片的每个数据，补全图片的宽和高
          res.body.message.forEach(item => {
            item.w = 600
            item.h = 400
          })
          this.list = res.body.message
        }
      })
    },
    // 即将关闭的时候，调用这个处理函数
    closeHandler () {
      console.log('closeHandler')
    },
    // 完全关闭之后，调用这个函数清理资源
    destroyHandler () {
      console.log('destroyHandler')
    }
  },
  components: {
    'cmt-box': comment
  }
}
</script>
<style lang="less" scoped>
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    margin: 15px 0;
    text-align: center;
  }
  .subtitle {
    font-size: 13px;
    display: flex;
    justify-content: space-between;
  }
  .content {
    font-size: 13px;
    line-height: 30px;
  }
  .thumbs{
    img{
box-shadow: 0 0 8px #999;
    }
  }
}
</style>
