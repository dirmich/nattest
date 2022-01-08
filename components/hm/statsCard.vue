<template>
  <hm-card v-bind="$attrs" v-on="$listeners" class="stats">
    <el-card slot="offset" :style="style">
      <i :class="icon" style="font-size: 40px" />
    </el-card>
    <div slot="content" class="holder">
      <div class="content">
        <p class="category" v-text="title" />
        <h3 class="title">
          {{ value }} <small>{{ smallValue }}</small>
        </h3>
      </div>
    </div>
  </hm-card>
</template>

<script>
import Card from './card.vue'

export default {
  // inheritAttrs: false,
  props: {
    ...Card.props,
    icon: {
      type: String,
      required: false,
    },
    subIcon: {
      type: String,
      default: undefined,
    },
    subIconColor: {
      type: String,
      default: undefined,
    },
    subTextColor: {
      type: String,
      default: undefined,
    },
    subText: {
      type: String,
      default: undefined,
    },
    title: {
      type: String,
      default: undefined,
    },
    value: {
      type: [Number, String],
      default: undefined,
    },
    smallValue: {
      type: String,
      default: undefined,
    },
  },
  computed: {
    style() {
      return {
        backgroundColor: this.color,
        color: this.dark ? 'white' : 'black',
        borderWidth: 0,
        padding: '4px',
      }
    },
  },
}
</script>

<style lang="scss">
.stats {
  display: flex;
  flex-wrap: wrap;
  position: relative;

  .v-card {
    border-radius: 4px;
    flex: 0 1 auto;
  }

  .v-card__text {
    display: inline-block;
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
  }

  .v-card__actions {
    flex: 1 0 100%;
  }
  .pa-4 {
    padding: 24px !important;
  }
  .holder {
    display: inline-block;
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
  }
  .content {
    text-align: right;
    padding: 16px;
  }
  .category {
    color: darkgray;
    caret-color: darkgray;
    margin-bottom: 10px;
  }
  .title {
    font-size: 20px;
    font-weight: 300;
  }
}
.el-card {
  overflow: visible !important;
}
</style>
