<template>
    <div>
        <EllipsisText :text="text" :clamp="clamp"></EllipsisText>
    </div>
</template>
<script>
    import EllipsisText from '@common/finsuit-components/EllipsisText'
    export default {
        components: {
            EllipsisText
        },
        name: '',
        props: ['text','clamp'],
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

</style>