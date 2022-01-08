<template>
  <div class="base">
    <hm-header
      :class="{
        'fixed-header': isFixed,
      }"
    />
    <el-container
      :class="{
        collapsed: !isOpen,
        'is-mobile': isMobile,
      }"
      :style="{
        'padding-top': paddingTop,
        '--sidebar-open': variables.sideBarWidth,
        '--sidebar-collapsed': variables.sidebarCollapsed,
      }"
      class="layout-container"
    >
      <hm-sidebar :menu="menu" v-show="isOpen" />
      <div class="main-container">
        <el-container direction="vertical">
          <el-main>
            <Nuxt />
          </el-main>
        </el-container>
      </div>
    </el-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import variables from '~/assets/scss/variables.scss'
export default {
  created() {
    this.init()
  },
  data() {
    return {
      variables,
      menu: [
        {
          title: '전체 현황',
          to: '/umain',
        },
        {
          title: '컨트롤러 관리',
          to: '/ufarm',
        },
        {
          title: '환경설정',
          to: '/usetting',
        },
        {
          title: '알람/메시지',
          to: '/umsg',
        },
        // {
        //   divider: true,
        // },
        {
          logout: true,
        },
      ],
    }
  },
  methods: {
    ...mapActions({
      init: 'init',
    }),
  },
  computed: {
    paddingTop() {
      return this.isFixed ? '50px' : '0px'
    },
    ...mapGetters({
      isOpen: 'isOpen',
      isMobile: 'isMobile',
      isFixed: 'isFixed',
    }),
  },
}
</script>

<style lang="scss">
.collapsed {
  .main-container {
    margin-left: $sidebarCollapsed;
  }
}

.is-mobile .main-container {
  margin-left: 0px;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: 100%; // calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
.el-main {
  min-height: calc(100vh - $headerHeight);
}
</style>
