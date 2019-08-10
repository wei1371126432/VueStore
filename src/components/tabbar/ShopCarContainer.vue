<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <!-- 商品数量展示 -->
      <div class="mui-card" v-for="(item,index) in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch v-model="$store.getters.getGoodsSelect[item.id]"
              @change="selectedChanged(item.id,$store.getters.getGoodsSelect[item.id])"></mt-switch>
            <img :src="item.thumb_path" alt="">
            <div class="info">
              <h3>{{item.title}}</h3>
              <p>
                <span>￥{{item.sell_price}}</span>
                <numbox :initcount="$store.getters.getShopCarCount[item.id]" :goodsid="item.id"></numbox>
                <a href="#" @click.prevent="remove(item.id,index)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- 总价钱 -->
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <div class="left">
              <p>总计(不含运费)</p>
              <p>
                已勾选商品 &nbsp; <span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span>&nbsp; 件,
                总价：<span class="red">￥{{$store.getters.getGoodsCountAndAmount.amount}}</span>
              </p>
            </div>
            <div class="right">
              <mt-button type="danger">去结算</mt-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import numbox from "../subcomponents/shopcar_numbox";
import { constants } from 'crypto';
export default {
  data() {
    return {
      goodslist: [] // 购物车中所有的数据
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      var arrid = [];
      this.$store.state.car.forEach(item => arrid.push(item.id));
      if (arrid.length <= 0) {
        return;
      }
      this.$http
        .get("api/goods/getshopcarlist/" + arrid.join(","))
        .then(res => {
          if (res.body.status === 0) {
            this.goodslist = res.body.message;
          }
        });
    },
    remove(id, index) {
      this.goodslist.splice(index, 1);
      this.$store.commit("removeFromCar", id);
    },
    selectedChanged(id,selected){
      this.$store.commit("updateSelected",{
        id,
        selected
      })
    }
  },
  components: {
    numbox
  }
};
</script>

<style lang="less" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goods-list {
    a {
      cursor: pointer;
    }
    img {
      width: 60px;
      height: 60px;
    }
    .mui-card-content-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    h3 {
      font-size: 13px;
    }
    .info {
      span {
        text-align: center;
        display: inline-block;
        min-width: 45px;
        margin-top: 10px;
        color: red;
        font-weight: bold;
      }

      p {
        margin-bottom: 0;
      }
    }
  }
  .red {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }
}
</style>
