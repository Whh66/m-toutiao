<template>
  <van-button :icon="value===1 ? 'good-job': 'good-job-o'" :class="{liked:value===1}" @click="onLike" :loading="loading" />
</template>

<script>
import { addLike, deleteLike } from '@/api/article.js'
export default {
  name: 'LikeArticle',
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async onLike () {
      this.loading = true
      try {
        let status = -1
        if (this.value === 1) {
          // 已点赞，取消收藏
          await deleteLike(this.articleId)
        } else {
          // 没点赞，点赞
          await addLike(this.articleId)
          status = 1
        }
        // 更新视图
        this.$emit('input', status)
        this.$toast.success(this.value !== 1 ? '点赞成功' : '取消点赞')
      } catch (err) {
        this.$toast.fail('操作失败，稍后重试')
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.van-icon {
  font-size: 40px;
}
.liked {
  .van-icon {
    color: #ffa500;
  }
}
</style>
