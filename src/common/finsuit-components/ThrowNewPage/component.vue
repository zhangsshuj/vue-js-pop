<template>
  <mask-box v-model="visible" :show-loading="false" :hideOnBlur="propsData.hideOnBlur" :defaultcloseBtnVisible="propsData.defaultcloseBtnVisible" :isTransparent="propsData.isTransparent" @on-show="$modalHelper.open(propsData.appendElement)" @on-hide="$modalHelper.close(propsData.appendElement)">
    <components :is="propsData.componentName" :componentData="propsData"></components>
  </mask-box>
</template>

<script>
import MaskBox from "@common/finsuit-components/MaskBox"
import NETWORK_ERROR_PAGE from "./NETWORK_ERROR_PAGE.vue"
export default {
  components: { MaskBox, NETWORK_ERROR_PAGE },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    propsData: {
      type: Object,
      default () { return {} }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
