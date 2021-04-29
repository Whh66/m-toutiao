<template>
  <div>
    <van-button class="follow-btn" round size="small" v-if="value" @click="onFollow" :loading="followLoading">已关注</van-button>
    <van-button class="follow-btn" type="info" color="#3296fa" round size="small" icon="plus" v-else @click="onFollow" :loading="followLoading">关注</van-button>
  </div>
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'
export default {
  name: 'FollowUser',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [Number, String, Boolean],
      required: true
    }
  },
  data () {
    return {
      followLoading: false
    }
  },
  methods: {
    async onFollow () {
      this.followLoading = true
      try {
        if (this.value) {
          // 已关注，取消关注
          await deleteFollow(this.userId)
          // this.article.is_followed=false
        } else {
          // 没有关注，添加关注
          await addFollow(this.userId)
          // this.article.is_followed=true
        }
        // 更新视图状态
        this.$emit('input', !this.value)
      } catch (err) {
        if (err.response && err.response.status === 400) {
          this.$toast('你不能关注你自己!')
        }
        this.$toast('操作失败，请稍后重试')
      }
      this.followLoading = false // 关闭关注按钮的loading状态
    }
  }
}
</script>

<style lang="less" scoped>
.follow-btn {
  width: 170px;
  height: 58px;
}
</style>
