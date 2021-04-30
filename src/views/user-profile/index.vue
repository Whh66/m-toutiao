<template>
  <div class="user-profile">
    <van-nav-bar class="page-nav-bar" title="个人信息" left-arrow @click-left="$router.back()" />

    <input type="file" hidden ref="file" @change="onFileChange">

    <!-- 个人信息 -->
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image round fit="cover" class="avater" :src="user.photo" />
    </van-cell>
    <van-cell title="昵称" is-link :value="user.name" @click="isUpdateNameShow=true" />
    <van-cell title="性别" is-link :value="user.gender===0?'男':'女'" @click="isUpdateGenderShow=true" />
    <van-cell title="生日" is-link :value="user.birthday" @click="isUpdateBirthdayShow=true" />

    <!-- 编辑昵称的弹框 -->
    <van-popup v-model="isUpdateNameShow" position="bottom" :style="{ height: '100%' }">
      <update-name @close="isUpdateNameShow=false" v-model="user.name" v-if="isUpdateNameShow" />
    </van-popup>

    <!-- 编辑性别的弹框 -->
    <van-popup v-model="isUpdateGenderShow" position="bottom">
      <update-gender @close="isUpdateGenderShow=false" v-if="isUpdateGenderShow" v-model="user.gender" />
    </van-popup>

    <!-- 编辑性别的弹框 -->
    <van-popup v-model="isUpdateBirthdayShow" position="bottom">
      <update-birthday @close="isUpdateBirthdayShow=false" v-if="isUpdateBirthdayShow" v-model="user.birthday" />
    </van-popup>

    <!-- 编辑头像的弹框 -->
    <van-popup v-model="isUpdatePhotoShow" position="bottom" :style="{ height: '100%' }">
      <update-photo :img="img" @close="isUpdatePhotoShow=false" @update-photo="user.photo=$event" v-if="isUpdatePhotoShow" />
      <!-- <update-photo @close="isUpdatePhotoShow=false" v-if="isUpdatePhotoShow" v-model="user.birthday" /> -->
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user.js'
import UpdateName from './components/update-name.vue'
import UpdateGender from './components/update-gender.vue'
import UpdateBirthday from './components/update-birthday.vue'
import UpdatePhoto from './components/update-photo.vue'
export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  data () {
    return {
      user: {}, // 个人信息
      isUpdateNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false,
      isUpdatePhotoShow: false,
      img: null // 预览的图片
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile () {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
      } catch (err) {
        this.$toast('数据获取失败')
      }
    },
    onFileChange () {
      const file = this.$refs.file.files[0]
      this.img = window.URL.createObjectURL(file)
      this.isUpdatePhotoShow = true

      // file-input 如果选了同一文件不会触发change事件
      // 解决办法就是每次使用完毕，把它的value清空
      this.$refs.file.value = ''
    }
  }
}
</script>

<style lang="less" scoped>
.user-profile {
  .avater {
    width: 60px;
    height: 60px;
  }
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
