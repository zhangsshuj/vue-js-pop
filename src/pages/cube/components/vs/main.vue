<template>
    <div class="main">
        <div class="lt">
            <div v-for="i in 100">
                {{i}}
            </div>
        </div>

            <div class="rt">
                <vsTouch :width="width" @style="styleFn">
                <div class="rt-box">
                    <div ref="rtMain" class="rt-main slide" :style="sle">
                        <ul v-for="j in 100">
                            <li v-for="k in 30">{{k}}</li>
                        </ul>
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
                width: 0,
            }
        },
        methods: {
            styleFn(val) {
                this.$emit('style',val)
            }
        },
        watch: {},
        created() {
        },
        mounted() {
            this.width = this.$refs['rtMain'].scrollWidth
        },
        destroyed() {
        },
    }
</script>
<style lang="scss" scoped>
    .main{
        display: flex;
        flex-wrap: nowrap;
        margin-top: 100px;
        .lt{
            width: 100px;
            display: flex;
            flex-direction: column;
            div{
                width: 100px;
                height: 80px;
                background: #3AA2F5;
            }
        }
        .rt{
            width: calc(100% - 100px);
            overflow-x: hidden;
            &-box{
                overflow-x: scroll;
                .rt-main{
                    width: min-content;
                    ul{
                        display: flex;
                        flex-wrap: nowrap;
                        li{
                            width: 180px;
                            height: 80px;
                            background: #179B16;
                            flex: 1 0 auto;
                        }
                    }
                }
            }
        }
    }
</style>