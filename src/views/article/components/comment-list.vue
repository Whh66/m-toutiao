<template>
  <div class="comment-list">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :error.sync="error" error-text="请求失败，点击重新加载" :immediate-check="false">
      <!-- <van-cell v-for="item in list" :key="item" :title="item.content" /> -->
      <comment-item v-for="(item,index) in list" :key="index" :comment="item" @reply-click="$emit('reply-click',$event)" />
    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from './comment-item.vue'

export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  props: {
    source: {
      type: [Object, Number, String],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      // 自定义prop数据验证
      validator (value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  data () {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      error: false
    }
  },
  created () {
    // 当你手动onLoad的话，它不会自动开始初始的loading，所以我们要手动的开启初始的loading
    this.loading = true
    this.onLoad()
  },
  methods: {
    async onLoad () {
      try {
        //  1. 请求获取数据
        const { data } = await getComments({
          type: this.type,
          source: this.source.toString(),
          offset: this.offset,
          limit: this.limit
        })
        // console.log(data);
        //  2.赋值给list
        const { results } = data.data
        this.list.push(...results)

        // 把文章评论的总数传递到外部
        this.$emit('onload-success', data.data)
        // 3.关闭loading
        this.loading = false
        // 4.判断是否还有数据
        if (results.length) {
          // 获取下一页数据
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
