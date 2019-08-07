<template>
  <div class="cmt-container">
    <h3>评论</h3>
    <hr>
    <textarea cols="30" rows="4" placeholder="请输入你要发表的评论（最多可以说20个字）" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
    <div class="cmt-list">
      <div class="cmt-item" v-for="(item,index) in comments" :key="index">
        <div class="cmt-titel">
          第{{index+1}}楼 用户：{{item.user_name}} 发表时间：{{item.add_time|dateFormat}}
        </div>
        <div class="cmt-body">
          {{item.content}}
        </div>
      </div>
    </div>
    <mt-button type="primary" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      pageIndex: 1,
      comments: [],
      msg: ''
    }
  },
  created () {
    this.getComments()
  },
  methods: {
    getComments () {
      this.$http
        .get('api/getcomments/' + this.id + '?pageindex=' + this.pageIndex)
        .then(res => {
          if (res.body.status === 0) {
            this.comments = this.comments.concat(res.body.message)
          }
        })
    },
    getMore () {
      this.pageIndex++
      this.getComments()
    },
    postComment () {
      if (this.msg.trim().length === 0) {
        return Toast('评论内容不能为空！！！')
      }
      this.$http
        .post('api/postcomment/' + this.$route.params.id, {
          content: this.msg.trim()
        })
        .then(res => {
          if (res.body.status === 0) {
            Toast('评论提交成功！！！')
            let cmt = {
              user_name: '',
              add_time: Date.now(),
              content: this.msg
            }
            this.comments.unshift(cmt)
            this.msg = ''
          } else {
            Toast('评论提交失败！！！')
          }
        })
    }
  },
  props: ['id']
}
</script>

<style lang="less" scoped>
.cmt-container {
  h3 {
    font-size: 16px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }
  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-titel {
        line-height: 40px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 40px;
        text-indent: 2em;
      }
    }
  }
}
</style>
