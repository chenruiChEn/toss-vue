<template>
  <el-select
    v-model="value"
    v-bind="$attrs"
    v-on="$listeners"
    :placeholder="placeholder"
  >
    <el-option v-if="showAll" label="全部" :value="null" />
    <el-option
      v-for="(item, index) in list"
      :key="index"
      :label="item[labelField]"
      :value="item[valueField]"
    />
  </el-select>
</template>

<script>
export default {
  name: "sky-select",
  /**
   * event 事件
   * 支持 el-select 的所有事件
   */
  props: {
    // 门店名称/编号
    value: {
      type: [String, Number],
      default: null
    },
    placeholder: {
      type: String,
      default: "请选择"
    },
    // label 字段名
    labelField: {
      type: String,
      default: "label"
    },
    // value 字段名
    valueField: {
      type: String,
      default: "value"
    },
    // 是否显示全部 默认展示
    showAll: {
      type: Boolean,
      default: true
    },
    list: {
      type: Array,
      default: () => {
        return [];
      }
    }
  }
};
</script>
