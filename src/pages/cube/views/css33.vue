<template>
    <div @click.stop="testFn" id="css3">
        san
    </div>
</template>
<script>
    export default {
        name: '',
        props: [],
        data() {
            return {
                mode: 'dark'
            }
        },
        methods: {
            testFn() {
                console.log(this.$attrs)
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