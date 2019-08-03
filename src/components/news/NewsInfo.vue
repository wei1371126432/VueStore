<template>
    <div class="newsinfo-container">
        <h3 class="title">{{newsinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间：{{newsinfo.add_time|dateFormat}}</span>
            <span>点击{{newsinfo.click+18}}次</span>
        </p>
        <hr>
        <div class="content" v-html="newsinfo.content"> </div>
       <comment-box :id="id"></comment-box>
    </div>
</template>
<script>
import comment from '../subcomponents/comment.vue'
export default {
  data () {
    return {
      id: this.$route.params.id,
      newsinfo: {}
    }
  },
  created () {
    this.getNewsInfo()
  },
  methods: {
    getNewsInfo () {
      this.$http.get('api/getnew/' + this.id).then(res => {
        if (res.body.status === 0) {
          this.newsinfo = res.body.message[0]
        }
      })
    }
  },
  components: {
    'comment-box': comment
  }
}
</script>
<style scoped>
.newsinfo-container {
    padding: 0 4px;
}
.newsinfo-container .title{
    font-size: 16px;
    text-align: center;
    margin:15px 0;
    color: red;
}
.newsinfo-container .subtitle{
    font-size: 13px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
}
</style>
