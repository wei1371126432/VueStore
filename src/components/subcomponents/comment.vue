<template>
    <div class="cmt-container">
        <h3>这是评论组件</h3>
        <hr>
        <textarea name="" id="" cols="30" rows="4" placeholder="请输入你要发表的评论（最多可以说20个字）"></textarea>
        <mt-button type="primary" size="large">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item">
                <div class="cmt-titel">
                    第一楼 用户：匿名用户 发表时间：12212121
                </div>
                <div class="cmt-body">
                    这是评论的主要内容
                </div>
            </div>
        </div>
        <mt-button type="primary" size="large" plain>加载更多</mt-button>
    </div>
</template>
<script>
export default {
    
}
</script>
<style>

</style>


