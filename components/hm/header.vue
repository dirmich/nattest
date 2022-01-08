<template>
  <el-header>
    <hm-flex
      align-h="space-between"
      vcenter
      fill
      :height="variables.headerHeight"
      row
    >
      <hm-flex row align-v="center">
        <hamburger
          id="hamburger-container"
          :is-active="isOpen"
          class="hamburger-container"
          @toggleClick="toggleSidebar"
        />
        <span>Smart-Farm 관리자</span>
      </hm-flex>
      <hm-flex row>
        <div v-show="!!user" id="username">
          {{ user ? `${user['name']}(${user['email']})` : '' }}
        </div>
        <el-dropdown trigger="click" @command="goto">
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="isSuper ? 'setting' : 'usetting'">
              Setting
            </el-dropdown-item>
            <el-dropdown-item command="logout">Logout</el-dropdown-item>
            <el-dropdown-item>Delete</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </hm-flex>
    </hm-flex>
  </el-header>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import variables from '~/assets/scss/variables.scss'
export default {
  data() {
    return {
      variables,
    }
  },
  methods: {
    goto(path) {
      // console.log('-->', path, this)
      switch (path) {
        case 'logout':
          this.logout()
          break
        default:
          this.$router.push({ path })
      }
    },
    ...mapMutations({
      toggleSidebar: 'toggleSidebar',
    }),
    ...mapActions({
      logout: 'auth/logout',
    }),
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
      isOpen: 'isOpen',
      isSuper: 'auth/isSuper',
    }),
  },
}
</script>

<style lang="scss" scoped>
#username {
  font-size: 14px;
  margin-right: 10px;
}
.el-header {
  height: $headerHeight !important;
  font-size: 20px;
  font-weight: bold;
  background-color: #060061;
  color: white;
}
.hamburger-container {
  line-height: 46px;
  height: 100%;
  float: left;
  cursor: pointer;
  transition: background 0.3s;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
}
</style>
