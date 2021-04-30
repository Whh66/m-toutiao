<template>
  <div class="update-name">
    <van-nav-bar title="设置昵称" left-text="取消" right-text="完成" @click-left="$emit('close')" @click-right="onConfirm" />

    <!-- 输入框 -->
    <div class="filed-wrap">
      <van-field v-model.trim="localName" rows="2" autosize type="textarea" maxlength="7" placeholder="请输入昵称" show-word-limit />
    </div>
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user.js'
export default {
  name: 'UpdateName',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      localName: this.value
    }
  },
  created () {

  },
  methods: {
    async onConfirm () {
      try {
        const localName = this.localName
        if (!localName.length) {
          this.$toast('昵称不能为空')
          return
        }

        await updateUserProfile({
          name: localName
        })

        // 更新视图
        this.$emit('input', localName)
        // 关闭弹框
        this.$emit('close')
        // 提示成功
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.filed-wrap {
  padding-top: 20px;
}
</style>
