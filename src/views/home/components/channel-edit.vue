<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button round plain size="mini" type="danger" class="edit-btn" @click="isEdit=!isEdit">{{isEdit ? '完成' : '编辑'}}</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item v-for="(channel,index) in myChannels" :key="index" class="grid-item" @click="onMyChannelClick(channel,index)">
        <van-icon name="clear" slot="icon" v-show="isEdit && !fiexChannels.includes(channel.id)"></van-icon>
        <span slot="text" class="text" :class="{active:index===active}">{{channel.name}}</span>
      </van-grid-item>
    </van-grid>
    <!-- /我的频道 -->

    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item v-for="(channel,index) in recommendChannels" :key="index" :text="channel.name" class="grid-item" icon="plus" @click="onAddChannel(channel)" />
    </van-grid>
    <!-- /频道推荐 -->
  </div>
</template>

<script>
import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/channel.js'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'

export default {
  name: 'ChannelEdit',
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [],
      isEdit: false, // 控制编辑状态
      fiexChannels: [0] // 固定频道，不允许删除
    }
  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels () {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
      } catch (err) {
        this.$totast('数据获取失败')
      }
    },
    async onAddChannel (channel) {
      this.myChannels.push(channel)

      // 数据持久化处理
      if (this.user) {
        try {
          // 已登录，把数据请求放到线上
          await addUserChannel({
            id: channel.id, // 频道id
            seq: this.myChannels.length // 序号
          })
        } catch (err) {
          this.$toast('保存失败，请稍后重试')
        }
      } else {
        // 未登录，存储到本地
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },
    onMyChannelClick (channel, index) {
      if (this.isEdit) {
        // 编辑状态，执行删除频道
        // 但如果是固定频道，则不删除
        if (this.fiexChannels.includes(channel.id)) {
          return
        }

        this.myChannels.splice(index, 1)

        // 处理持久化
        this.deleteChannel(channel)

        if (index <= this.active) {
          // 让激活频道所有减一
          this.$emit('update-active', this.active - 1, true)
        }
      } else {
        // 非编辑状态，执行切换频道
        this.$emit('update-active', index, false)
      }
    },
    async deleteChannel (channel) {
      if (this.user) {
        // 已登录，将数据更新到线上
        try {
          await deleteUserChannel(channel.id)
        } catch (err) {
          this.$toast('删除频道失败,请稍后重试')
        }
      } else {
        // 未登录，更新到本地
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    }
  },
  computed: {
    ...mapState(['user']),
    recommendChannels () {
      return this.allChannels.filter(channel => {
        return !this.myChannels.find(myChannel => {
          return channel.id === myChannel.id
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/.grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      flex-direction: row;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .van-icon-plus {
        font-size: 28px;
        margin-right: 6px;
      }
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }
}
</style>
