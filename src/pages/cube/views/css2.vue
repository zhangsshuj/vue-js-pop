<template>
    <div v-bind:id="'123132' | myFilter">
        <slot>2</slot>
        <input v-my-directive:[forj]="{name:'yy',ll: 1333544}" @keyup.media-play-pause="two" type="text" style="width:100%">
        {{'123132' | myFilter}}
    </div>
</template>
<script>
    import Vue from "vue"
    import css3 from "./css3"
    export default {
        name: '',
        props: ['value'],
        data() {
            return {
                a:1,
                aa: [{a: 1},{b:10}],
                forj: 'left'
            }
        },
        methods: {
            two() {
               console.log('two')
                console.log(this)
                Vue.set(this.aa, 'b', '1')
                console.log(this.aa.b)
                this.forj = 'right'
                let css4 = Vue.extend(css3)
                var res = Vue.compile('<div><span>{{ msg }}</span></div>')
                console.log(res)
                new css4().$mount('#css')
            }
        },
        computed: {},
        watch: {
            value(val) {
                console.log(val)
            }
        },
        created() {
        },
        mounted() {
            console.log(this.getMap())
        },
        inject: ['getMap'],
        destroyed() {
        },
    }
</script>
<style lang="scss" scoped>

</style>