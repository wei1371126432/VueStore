<template>
  <div id="slider" class="mui-slider">
    <div id="sliderSegmentedControl"
      class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
      <div class="mui-scroll">
        <a :class="['mui-control-item' , item.id==0 ? 'mui-active' : '' ] " href="#item1mobile"
          data-wid="tab-top-subpage-1.html" v-for="item in cates" :key="item.id">
          {{item.title}}
        </a>
      </div>
    </div>

  </div>
</template>
<script>
import mui from "../../../static/mui/js/mui.min.js";
export default {
  data() {
    return {
      cates: []
    };
  },
  created() {
    this.getAllCategory();
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005
    });
  },
  methods: {
    getAllCategory() {
      this.$http.get("api/getimgcategory").then(res => {
        if (res.body.status === 0) {
          res.body.message.unshift({ title: "全部", id: 0 });
          this.cates = res.body.message;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
* {
  touch-action: pan-y;
}
</style>



