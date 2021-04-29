<template>
  <van-button :icon="value ? 'star': 'star-o'" :class="{collected:value}" @click="onCollect" :loading="loading" />
</template>

<script>
import { addCollect, deleteCollect } from '@/api/article.js'
export default {
  name: 'CollectArticle',
  props: {
    value: {
      type: Boolean,
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
    async onCollect () {
      this.loading = true
      try {
        if (this.value) {
          // 已收藏，取消收藏
          await deleteCollect(this.articleId)
        } else {
          // 没收藏，收藏
          await addCollect(this.articleId)
        }
        // 更新视图
        this.$emit('input', !this.value)

        this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
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
.collected {
  .van-icon {
    color: #ffa500;
  }
}
</style>
