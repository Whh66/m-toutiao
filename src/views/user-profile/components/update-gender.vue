<template>
  <div class="update-gender">
    <van-picker title="性别" show-toolbar :columns="columns" @confirm="onConfirm" @cancel="$emit('close')" @change="onChange" :default-index="value" />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user.js'
export default {
  name: 'UpdateGender',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      localGender: 0
    }
  },
  created () {

  },
  methods: {
    async onConfirm (value, index) {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })

      try {
        await updateUserProfile({
          gender: this.localGender
        })
        this.$emit('input', this.localGender)
        this.$emit('close')
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    },
    onChange (picker, value, index) {
      this.localGender = index
    }
  }
}
</script>

<style lang="less" scoped>
</style>
