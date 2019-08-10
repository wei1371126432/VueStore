<template>
  <div class="app-containet">
    <!-- 顶部 Header 区域 -->
    <mt-header fixed title="Vue-cli TO Vue商城" class="header-top">
      <span slot="left" @click="goBack" v-show="flag">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>
    <!-- 中间 路由router-view区域  -->
    <transition>
      <router-view></router-view>
    </transition>
    <!-- 底部 Tabbar 区域 -->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item-wxc" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item-wxc" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item-wxc" to="/shopcar">
        <span class="mui-icon mui-icon-contact">
          <span class="mui-badge" id="badge">{{this.$store.getters.getAllCount}}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item-wxc" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>
<script>
export default {
  data (){
    return {
      flag:false
    }
  },
  methods:{
    goBack(){
      this.$router.go(-1)
    }
  },
  created(){
    this.flag=this.$route.path === '/home' ? false : true
  },
  watch:{
    '$route.path':function(newVal){
      if(newVal==='/home'){
        this.flag=false
      }else{
        this.flag=true
      }
    }
  }
};
</script>
<style lang="less" scoped>
.app-containet {
  padding-top: 40px;
  padding-bottom: 50px;
  overflow-x: hidden;
  .header-top {
    z-index: 9999;
  }
}
.v-enter {
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
/* 解决tabbor无法切换问题 */
.mui-bar-tab .mui-tab-item-wxc.mui-active {
  color: #007aff;
}

.mui-bar-tab .mui-tab-item-wxc {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}

.mui-bar-tab .mui-tab-item-wxc .mui-icon {
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-wxc .mui-icon ~ .mui-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
