<template>
  <div class="search-suggestion">
    <van-cell icon="search" v-for="(item,index) in suggestions" :key="index" @click="$emit('search',item)">
      <div slot="title" v-html="highlight(item)"></div>
    </van-cell>

  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
// lodash 支持按需加载，有利于打包结果优化
import { debounce } from 'lodash'

export default {
  name: 'SearchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: [] // 联想建议数据列表
    }
  },
  watch: {
    searchText: {
      handler: debounce(function (value) {
        this.loadSearchSuggestions(value)
      }, 1000),
      // handler(value) {
      //   this.loadSearchSuggestions(value)
      // },
      immediate: true // 该回调会在侦听开始之后被立即调用
    }
  },
  methods: {
    async loadSearchSuggestions (q) {
      try {
        const { data } = await getSearchSuggestions(q)
        this.suggestions = data.data.options
      } catch (err) {
        this.$toast('数据获取失败，请稍后重试')
      }
    },
    highlight (item) {
      const reg = new RegExp(this.searchText, 'gi')
      return item.replace(reg, `<span class="active">${this.searchText}</span>`)
    }
  }
}
</script>

<style lang="less" scoped>
.search-suggestion {
  /deep/.active {
    color: #3296fa;
  }
}
</style>
