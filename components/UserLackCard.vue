<template>
  <el-card style="margin-bottom: 20px">
    <el-row
      type="flex"
      justify="space-around"
      align="middle"
      slot="header"
      class="clearfix"
    >
      <el-col class="title">
        {{ controller['name'] }}({{ controller['farm']['name'] }})
      </el-col>
      <el-button icon="el-icon-setting" type="text" @click="onDetail()" />
    </el-row>
    <div class="pdata" v-if="rdata.length === 5">
      <status name="온도" warn :value="rdata[0] + '°C'" />
      <status name="습도" error :value="rdata[1] + '%'" />
      <status name="CO2" :value="rdata[2]" />
      <status name="PH" :value="rdata[3]" />
      <status name="조도" warn :value="rdata[4]" />
    </div>
    <el-row justify="center" type="flex" class="holder">
      <video
        :poster="sample"
        :src="controller['url']"
        class="video"
        ref="video"
        autoplay
      />
      <div class="overlay" @click="fullscreen">
        <el-row
          justify="center"
          align="middle"
          type="flex"
          style="height: 100%"
        >
          <span style="background-color: grey"> Click to Fullscreen </span>
        </el-row>
      </div>
    </el-row>
  </el-card>
</template>

<script>
//http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4
import { mapGetters, mapActions } from 'vuex'
import sample from '~/assets/farm.png'
export default {
  props: {
    controller: {
      type: Object,
      default: () => {
        return {
          _id: '',
          name: '',
          owner: '',
          farm: '',
        }
      },
    },
  },
  async mounted() {
    // console.log('mounted')
    await this.loadData()
    this.start()
  },
  beforeDestroy() {
    // console.log('unmounting')
    if (this.ts) clearInterval(this.ts)
  },
  destroyed() {
    // console.log('unmounted')
  },

  data() {
    return {
      sample,
      warn: '#ff8800',
      normal: '#00ff00',
      error: '#ff0000',
      rdata: [],
    }
  },
  methods: {
    fullscreen() {
      const elem = this.$refs.video
      if (elem.requestFullscreen) {
        elem.requestFullscreen()
      } else if (elem.webkitRequestFullscreen) {
        /* Safari */
        elem.webkitRequestFullscreen()
      } else if (elem.msRequestFullscreen) {
        /* IE11 */
        elem.msRequestFullscreen()
      }
    },
    onDetail() {
      this.$emit('detail', this.controller)
    },
    async loadData() {
      const r = await this.$axios.get(`/data/${this.controller._id}`)
      this.rdata = r[0].data
    },
    start() {
      if (this.controller._id) {
        this.ts = setInterval(async () => {
          await this.loadData()
        }, 5000)
      }
    },
  },
  computed: {
    ...mapGetters({}),
  },
}
</script>
<style>
.el-progress__text {
  font-size: 0.7rem !important;
}
::-webkit-media-controls {
  display: none !important;
}
</style>
<style lang="scss" scoped>
.video {
  position: relative;
  width: 100%;
  max-width: 500px;
  /* height: 300px; */
  border: 1px solid lightblue;
  object-fit: contain;
}

.holder {
  margin-top: 15px;
  cursor: pointer;
  &:hover > .overlay {
    display: block;
  }
}
.overlay {
  display: none;
  color: white;
  font-weight: bold;
  /* background-color: gray; */
  /* opacity: 0.7; */
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
}

.title {
  font-weight: bold;
  color: green;
}
.status {
  margin: 0 5px;
  width: 50%;
  height: 5px;
  border-radius: 2px;
}

.normal {
  background-color: $color-success;
}
</style>
