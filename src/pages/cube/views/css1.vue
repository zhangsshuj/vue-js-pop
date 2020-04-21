<template>
    <div>
        <div v-for="it in hh">
            <slot name="one">{{user.a}}</slot>
        </div>
    </div>
</template>
<script>
    export default {
        name: '',
        props: ['hh'],
        data() {
            return {
                one: '123',
                b: 3,
                user:{a:'a',b:'b'}
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