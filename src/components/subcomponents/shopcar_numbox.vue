<template>
  <div class="mui-numbox" data-numbox-min='1' style="height:25px">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" :value="initcount"  @change="countChanged"  readonly
    ref="numbox"
    />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>
<script>
import mui from '../../../static/mui/js/mui.min.js'
export default {
  data () {
    return {

    }
  },
  methods: {
    countChanged () {
      // 数量改变了
      this.$store.commit('updateGoodsInfo', {
        id: this.goodsid,
        count: parseInt(this.$refs.numbox.value)
      })
    }
  },
  // 初始化数字选择框
  mounted () {
    mui('.mui-numbox').numbox()
  },
  props: ['initcount', 'goodsid']
}
</script>

<style lang="less" scoped>
</style>
