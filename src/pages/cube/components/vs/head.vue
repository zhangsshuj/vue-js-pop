<template>
    <div class="head">
        <div class="lt">

        </div>
        <div class="rt">
            <vsTouch :width="width" @style="styleFn">
            <div class="rt-box">
                <div class="rt-head slide" ref="rtHead" :style="sle">
                    <div class="rt-li" v-for="i in 30">{{i}}</div>
                </div>
            </div>
            </vsTouch>
        </div>
    </div>
</template>
<script>
    import vsTouch from './touch.vue'
    export default {
        components: {vsTouch},
        name: '',
        props: ['sle'],
        data() {
            return {
                width: 0
            }
        },
        methods: {
            styleFn(val) {
               this.$emit('style',val)
            }
        },
        computed: {},
        watch: {},
        created() {
        },
        mounted() {
            this.width = this.$refs['rtHead'].scrollWidth
        },
        destroyed() {
        },
    }
</script>
<style lang="scss" scoped>
    .head{
        display: flex;
        position: fixed;
        width: 100%;
        height: 100px;
        top:0;
        left: 0;
        z-index: 100;
        .lt{
            background: red;
            height: 100px;
            width: 100px;
        }
        .rt{
            background: blue;
            height: 100px;
            width: calc(100% - 100px);
            overflow-x: hidden;
            &-box{
                overflow-x: scroll;
                .rt-head{
                    width: min-content;
                    display: flex;
                    flex-wrap: nowrap;
                    flex-shrink: 0;
                    .rt-li{
                        width: 180px;
                        height: 100px;
                        background: orange;
                        flex: 1 0 auto;
                    }
                }
            }
        }
    }
</style>