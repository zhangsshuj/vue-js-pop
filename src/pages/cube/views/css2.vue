<template>
    <div>
        <slot>2</slot>
    </div>
</template>
<script>
    export default {
        name: '',
        props: ['value'],
        data() {
            return {}
        },
        methods: {},
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