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
<<<<<<< HEAD
            return {
                mode: dark
            }
=======
            return {}
>>>>>>> 9ab2908b2c4d5c2c8ba407dc731faaa0e5cda786
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