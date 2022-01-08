<template>
  <el-card v-bind="$attrs" :style="styles" v-on="$listeners" class="basecard">
    <helper-offset
      v-if="hasOffset"
      :inline="inline"
      :full-width="fullWidth"
      :offset="offset"
    >
      <el-card v-if="!$slots.offset" :style="titleStyle">
        <slot v-if="!title && !text" name="header" />
        <span>
          <h4 class="title font-weight-light mb-2">{{ title }}</h4>
          <p class="category font-weight-thin">{{ text }}</p>
        </span>
      </el-card>
      <slot v-else name="offset" />
    </helper-offset>
    <slot name="content" />

    <div>
      <slot />
    </div>
  </el-card>
</template>

<script>
export default {
  inheritAttrs: false,

  props: {
    dark: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: 'secondary',
    },
    elevation: {
      type: [Number, String],
      default: 10,
    },
    inline: {
      type: Boolean,
      default: false,
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
    divide: {
      type: Boolean,
      default: false,
    },

    offset: {
      type: [Number, String],
      default: 24,
    },
    title: {
      type: String,
      default: undefined,
    },
    text: {
      type: String,
      default: undefined,
    },
  },
  mounted() {
    // console.log('-->', this.title, this.text)
  },
  computed: {
    hasOffset() {
      return this.$slots.header || this.$slots.offset || this.title || this.text
    },
    styles() {
      if (!this.hasOffset) return null

      return {
        position: 'relative',
        marginBottom: `${this.offset}px`,
        marginTop: `${this.offset * 2}px`,

        textAlgin: 'right',
      }
    },
    titleStyle() {
      return {
        backgroundColor: this.color,
      }
    },
  },
}
</script>

<style lang="scss">
.v-card--material {
  &__header {
    padding-top: 4px;
    padding-left: 4px;
    &.v-card {
      border-radius: 4px;
    }
  }
}
.v-card--material-chart {
  .v-card--material__header {
    .ct-label {
      color: inherit;
      opacity: 0.7;
      font-size: 0.975rem;
      font-weight: 100;
    }

    .ct-grid {
      stroke: rgba(255, 255, 255, 0.2);
    }
    .ct-series-a .ct-point,
    .ct-series-a .ct-line,
    .ct-series-a .ct-bar,
    .ct-series-a .ct-slice-donut {
      stroke: rgba(255, 255, 255, 0.8);
    }
    .ct-series-a .ct-slice-pie,
    .ct-series-a .ct-area {
      fill: rgba(255, 255, 255, 0.4);
    }
  }
}
.basecard {
  & > .el-card__body {
    display: flex;
  }
}
</style>
