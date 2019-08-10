<template>
  <div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max'>
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" value="1"  @change="countChanged" ref="numbox"/>
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>
<script>
import mui from '../../../static/mui/js/mui.min.js'
export default {
  data () {
    return {
      value: 1
    }
  },
  methods: {
    countChanged () {
      // 调用父组件的函数，将数值传给父组件
      this.$emit('getcount', parseInt(this.$refs.numbox.value))
    }
  },
  // 初始化数字选择框
  mounted () {
    mui('.mui-numbox').numbox()
  },
  props: ['max'],
  watch: {
    max: function (newVal, oldVal) {
      mui('.mui-numbox').numbox().setOption('max', newVal)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
