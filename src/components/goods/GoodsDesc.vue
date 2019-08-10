<template>
  <div class="goodsdesc-container">
    <h3>{{goodsdesc.title}}</h3>
    <hr>
    <div class="content" v-html="goodsdesc.content">
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      id: this.$route.params.id,
      goodsdesc: {}
    }
  },
  created () {
    this.getGoodsDesc()
  },
  methods: {
    getGoodsDesc () {
      this.$http.get('api/goods/getdesc/' + this.id).then(res => {
        if (res.body.status === 0) {
          this.goodsdesc = res.body.message[0]
        }
      })
    }
  }
}
</script>
<style lang="less">
.goodsdesc-container{
    padding: 4px;
    h3{
        font-size: 16px;
        color:#226aff;
        text-align: center;
        margin:15px 0;    }
        .content{
            img{width: 100%;
            }
        }
       
}
</style>
