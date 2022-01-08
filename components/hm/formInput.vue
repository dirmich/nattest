<template>
  <el-data ref="data" :model="data" label-width="120px">
    <el-data-item label="Activity name">
      <el-input v-model="data.name"></el-input>
    </el-data-item>
    <el-data-item label="Activity zone">
      <el-select v-model="data.region" placeholder="please select your zone">
        <el-option label="Zone one" value="shanghai"></el-option>
        <el-option label="Zone two" value="beijing"></el-option>
      </el-select>
    </el-data-item>
    <el-data-item label="Activity time">
      <el-col :span="11">
        <el-date-picker
          type="date"
          placeholder="Pick a date"
          v-model="data.date1"
          style="width: 100%"
        ></el-date-picker>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-time-picker
          placeholder="Pick a time"
          v-model="data.date2"
          style="width: 100%"
        ></el-time-picker>
      </el-col>
    </el-data-item>
    <el-data-item label="Instant delivery">
      <el-switch v-model="data.delivery"></el-switch>
    </el-data-item>
    <el-data-item label="Activity type">
      <el-checkbox-group v-model="data.type">
        <el-checkbox label="Online activities" name="type"></el-checkbox>
        <el-checkbox label="Promotion activities" name="type"></el-checkbox>
        <el-checkbox label="Offline activities" name="type"></el-checkbox>
        <el-checkbox label="Simple brand exposure" name="type"></el-checkbox>
      </el-checkbox-group>
    </el-data-item>
    <el-data-item label="Resources">
      <el-radio-group v-model="data.resource">
        <el-radio label="Sponsor"></el-radio>
        <el-radio label="Venue"></el-radio>
      </el-radio-group>
    </el-data-item>
    <el-data-item label="Activity data">
      <el-input type="textarea" v-model="data.desc"></el-input>
    </el-data-item>
    <el-data-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button>Cancel</el-button>
    </el-data-item>
  </el-data>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {},
    },
  },
}
</script>

<style></style>
