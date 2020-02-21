<template>
    <div style="text-align: center">
        <img :src="componentData.imgSrc" alt="">
    </div>
</template>
<script>
    export default {
        name: '',
        props: ['componentData'],
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
    img{
        width: 80%;
        margin: auto;
    }
</style>