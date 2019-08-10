<template>
  <div>
    <mt-swipe :auto="2500">
      <mt-swipe-item v-for="item in LunboList" :key="item.img" :isfull="false">
        <img :src="item.img" :class="{full:isfull}"><img>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
export default {
  props: ['LunboList', 'isfull']
}
</script>
<style lang="less" scoped>
.mint-swipe {
    text-align: center;
  height: 200px;
}
.mint-swipe-item img {
  height: 100%;
}
.full {
    width: 100%;
}

</style>
