<template>
  <transition name="sidebar">
    <el-aside
      width="variables.sideBarWidth"
      class="sidebar-container"
      :class="{ collapsed: !isOpen }"
    >
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <!-- <div style="width: 200px"> -->
        <el-menu
          router
          :default-active="activeMenu"
          :collapse="!isOpen"
          :background-color="variables.menuBg"
          :text-color="variables.menuText"
          :unique-opened="false"
          :active-text-color="variables.menuActiveText"
          :collapse-transition="false"
          mode="vertical"
        >
          <template v-for="(item, idx) in menu">
            <el-submenu
              v-if="item.sub"
              :index="idx.toString()"
              :key="`m_${idx}`"
            >
              <template slot="title" v-if="!item.divider">
                <i v-if="item.icon" :class="item.icon" />
                <div>{{ item.title }}</div>
              </template>
              <el-menu-item-group
                v-if="!item.divider && item.sub && item.sub.length > 0"
              >
                <el-menu-item
                  :route="sub.to"
                  v-for="(sub, sidx) in item.sub"
                  :index="sidx.toString()"
                  :key="`m_${sidx}`"
                >
                  <div>{{ sub.title }}</div>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <div v-else-if="item.logout">
              <el-divider />
              <el-menu-item @click="logout"> 로그아웃 </el-menu-item>
            </div>
            <el-divider v-else-if="item.divider" />
            <el-menu-item :route="item.to" :index="item.to" v-else>{{
              item.title
            }}</el-menu-item>
          </template>
        </el-menu>
        <!-- </div> -->
      </el-scrollbar>
      <div class="mask" @click="showSidebar(false)"></div>
    </el-aside>
  </transition>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import variables from '~/assets/scss/variables.scss'

export default {
  props: {
    menu: {
      type: Array,
      default: [],
    },
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout',
    }),
    ...mapMutations({
      showSidebar: 'showSidebar',
    }),
  },
  computed: {
    activeMenu() {
      return this.$route.path
    },
    ...mapGetters({
      isOpen: 'isOpen',
    }),
  },
  data() {
    return {
      variables,
    }
  },
}
</script>

<style lang="scss" scoped></style>
<style>
.el-divider {
  background-color: darkgray;
}
.el-divider--horizontal {
  width: 80%;
  margin: 5px 10%;
}
</style>
