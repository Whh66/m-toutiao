<template>
  <div class="search-result">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :error.sync="error" error-text="请求失败，点击重新加载" @load="onLoad">
      <van-cell v-for="(article,index) in list" :key="index" :title="article.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'

export default {
  name: 'SearchResult',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20,
      error: false
    }
  },
  methods: {
    async onLoad () {
      try {
        // 发起请求
        const { data } = await getSearchResult({
          page: this.page,
          per_page: this.per_page,
          q: this.searchText
        })

        // 随机制造一些错误, 来模拟刷新失败效果
        // if (Math.random() > 0.5) {
        //   JSON.parse('dssssss')
        // }

        // 2. 将数据添加到list
        const { results } = data.data
        this.list.push(...results)
        // 3. 关闭本次加载loading
        this.loading = false
        // 4.判断是否还有数据
        if (results.length) {
          this.page++
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
.search-result {
  overflow-y: auto;
  height: 88vh;
}
</style>
