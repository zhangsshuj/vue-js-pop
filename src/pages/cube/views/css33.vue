<template>
    <div @click="testFn">
        san
    </div>
</template>
<script>
    export default {
        name: '',
        props: [],
        data() {
            return {
                mode: dark
            }
        },
        methods: {
            testFn() {
                this.$emit('test', '123000')
            },
        },
        computed: {},
        watch: {},
        created() {
            console.log(this.$attrs.test)
        },
        mounted() {
        },
        destroyed() {
        },
    }
</script>
<style lang="scss" scoped>

</style>