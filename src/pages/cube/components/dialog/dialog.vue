<template>
    <div>
        <MaskBox v-model="visible" :show-loading="propsData.showLoading" :hideOnBlur="propsData.hideOnBlur" :defaultcloseBtnVisible="propsData.defaultcloseBtnVisible" :isTransparent="false" @on-show="$modalHelper.open(propsData.appendElement)" @on-hide="$modalHelper.close(propsData.appendElement)">
            <components :is="propsData.componentName" :componentData="propsData"></components>
        </MaskBox>
    </div>
</template>
<script>
    import MaskBox from '@common/finsuit-components/MaskBox'
    import companent1 from './companent1.vue'
    import companent2 from './companent2.vue'
    import shareImg from './shareImg.vue'
    export default {
        components: {
            MaskBox,
            companent1,
            companent2,
            shareImg
        },
        name: '',
        props: {
            visible:{
                type: Boolean,
                default: false
            },
            propsData: {
                type: Object,
                default() { return {} }
            }
        },
        data() {
            return {}
        },
        methods: {},
        computed: {},
        watch: {},
        created() {
        },
        mounted() {
        },
        destroyed() {
        },
    }
</script>
<style lang="scss" scoped>

</style>