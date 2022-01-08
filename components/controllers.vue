<template>
  <el-col class="base">
    <span>미할당 컨트롤러</span>
    <el-row type="flex" class="list">
      <el-col>
        <div
          class="item"
          v-for="(item, idx) in list"
          :key="idx"
          @click="onEdit(item)"
        >
          {{ item.name }}
        </div>
      </el-col>
    </el-row>
    <el-dialog title="컨트롤러 할당" :visible.sync="dlgShow">
      <el-form :model="currItem" ref="form">
        <el-form-item label="Controller 이름" label-width="120px" prop="name">
          <el-input
            readonly
            v-model="currItem.name"
            autocomplete="new-password"
          ></el-input>
        </el-form-item>

        <el-form-item label="관리자" label-width="120px">
          <el-select v-model="currItem.owner" placeholder="관리자를 선택하세요">
            <el-option
              v-for="(item, idx) in users"
              :key="`u_${idx}`"
              :label="item.name"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Farm" label-width="120px">
          <el-select v-model="currItem.farm" placeholder="Farm을 선택하세요">
            <el-option
              v-for="(item, idx) in farms"
              :key="`f_${idx}`"
              :label="item.name"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dlgShow = false">취소</el-button>
        <el-button type="primary" @click="submitItem">확인</el-button>
      </span>
    </el-dialog>
  </el-col>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      dlgShow: false,
      currItem: {},
    }
  },
  methods: {
    onEdit(item) {
      this.currItem = { ...item }
      this.dlgShow = true
    },
    submitItem() {
      this.$confirm(`${this.currItem.name}을 할당하시겠습니까?`).then(
        async () => {
          const r = await this.$axios.post('/controller', {
            _id: this.currItem._id,
            owner: this.currItem.owner._id,
            farm: this.currItem.farm._id,
          })
          await this.reload()
          this.dlgShow = false
          this.$alert('할당되었습니다')
        }
      )
    },
    ...mapActions({
      reload: 'farm/reload',
    }),
  },
  computed: {
    list() {
      const r = this.controllers.filter((i) => !i.owner || !i.farm)
      return r
    },
    ...mapGetters({
      controllers: 'farm/controllers',
      users: 'farm/users',
      farms: 'farm/farms',
    }),
  },
}
</script>

<style lang="scss" scoped>
.base {
  margin: 10px 5px 0 0;
  height: 100%;
}
.list {
  margin: 10px 10px 0 0;
  padding: 5px;
  border: 1px solid lightgray;
  border-radius: 5px;
  height: 100%;
}
.item {
  cursor: pointer;
}
</style>
