<template>
    <div class="vs">
        <vsHead :sle="style" ref="head" @style="styleFn"></vsHead>
        <vsMain :sle="style" ref="main" @style="styleFn"></vsMain>
    </div>
</template>
<script>
    import vsHead from '../components/vs/head.vue'
    import vsMain from '../components/vs/main.vue'
//    import Scroller from '../components/vs/comparaScroller'
    export default {
        components: {vsHead,vsMain},
        name: '',
        props: [],
        data() {
            return {
                style:'',
                scroller: null,
            }
        },
        methods: {
            styleFn(val) {
                this.style = ''
                this.style = val
            }
        },
        computed: {},
        watch: {},
        created() {
        },
        mounted() {
//            this.scroller = new Scroller('.slide')
        },
        destroyed() {
        },
    }
</script>
<style lang="scss" scoped>
    .vs{
        width: 100%;
    }
</style>