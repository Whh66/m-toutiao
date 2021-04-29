<template>
  <div class="article-list">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" :success-text="refreshSuccessText" :success-duration='1500'>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :error.sync="error" error-text="请求失败，点击重新加载">
        <article-item v-for="(article,index) in list" :key="index" :article="article" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article.js'
import ArticleItem from '@/components/article-item'

export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      refreshing: false,
      refreshSuccessText: '刷新成功'
    }
  },
  methods: {
    async onLoad () {
      try {
        // 1.请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })

        //  随机制造一些错误,来模拟请求失败效果
        // if (Math.random() > 0.5) {
        //   JSON.parse('dssssss')
        // }

        // 2.把请求数据放到list数组
        const { results } = data.data
        this.list.push(...results)
        // 3.本次数据加载结束后把加载状态设置为false
        this.loading = false
        // 4.判断数据是否全部加载完成
        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (error) {
        // 展示错误提示
        this.error = true
        // 请求失败，也需要关闭loading
        this.loading = false
      }
    },
    async onRefresh () {
      try {
        // 1.请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1
        })

        // 随机制造一些错误, 来模拟刷新失败效果
        // if (Math.random() > 0.5) {
        //   JSON.parse('dssssss')
        // }

        // 2.将数据追加到列表顶部
        this.list.unshift(...data.data.results)
        // 3.关闭下拉刷新
        this.refreshing = false
        // 更新下拉刷新提示文本
        this.refreshSuccessText = `刷新成功，更新了${data.data.results.length}条数据`
      } catch (err) {
        this.refreshing = false
        this.refreshSuccessText = '刷新失败'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
  // 百分比单位是相对于父元素的
  // height: 100%;
  height: 79vh;
  overflow-y: auto;
}
</style>
