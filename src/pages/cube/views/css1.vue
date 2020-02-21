<template>
    <div>
        <div v-for="it in hh">
            <slot name="one">{{$root.foo}}</slot>
        </div>
    </div>
</template>
<script>
    export default {
        name: '',
        props: ['hh'],
        data() {
            return {
                one: '123'
            }
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