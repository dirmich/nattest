<template>
  <el-card style="margin-bottom: 20px">
    <el-row type='flex' justify="space-around" align="middle" slot="header" class="clearfix">
      <el-col :span="10">{{controller['name']}}</el-col>
      <el-col :span="10" style="text-align:right">{{controller['owner']['name']}}</el-col>
      <el-button icon="el-icon-setting" type="text" @click="onDetail()"/>
    </el-row>
      <div class="">
        <div class="pdata" v-if="rdata.length===5">
          <status name="온도" warn :value="rdata[0]+'°C'"/>          
          <status name="습도" error :value="rdata[1]+'%'"/>
          <status name="CO2"  :value="rdata[2]"/>
          <status name="PH"  :value="rdata[3]"/>
          <status name="조도" warn :value="rdata[4]"/>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  props: {
    controller: {
      type: Object,
      default: () => {
        return {
          _id:'',
          name:'',
          owner:'',
          farm:'',
        }
      },
    },
  },
  // async mounted() {
  //   // console.log('mounted')
  //   this.start()
  //    this.loadData()
  // },
  // beforeDestroy() {
  //   // console.log('unmounting')
  //   if (this.ts)
  //   clearInterval(this.ts)
  // },
  // destroyed() {
  //   // console.log('unmounted')
  // },

  data() {
    return {
      warn:'#ff8800',
      normal:'#00ff00',
      error:'#ff0000',
      // rdata:[],
      // ts:null
    }
  },
  methods:{
    onDetail() {
      this.$emit('detail',this.controller)
    },
    //  async loadData() {
    //              const r = await this.$axios.get(`/data/${this.controller._id}`)
    //     this.rdata = r[0].data
    //  },
    //  start() {
    //   if (this.controller._id) {
    //     this.ts = setInterval(async ()=>{
    //       await this.loadData()
    //     },5000)
        
    //   }
    //  }
    
  },
  computed:{    
    rdata() {
      const target =  this.sensor.filter(p=>p._id===this.controller._id)
      return target&&target.length>0?target[0].data:[]
    },
    ...mapGetters({
      sensor:'farm/sensor'
    })
  }
}
</script>
<style>
.el-progress__text{
        font-size: .7rem !important;
    }
</style>
<style lang="scss" scoped>

.status {
  margin: 0 5px;
  width: 50%;
  height: 5px;
  border-radius: 2px;
}

.normal {
  background-color:$color-success;
}
</style>
