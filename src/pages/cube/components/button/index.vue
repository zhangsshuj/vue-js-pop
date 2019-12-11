<template>
    <div>
        <btn
                :text=text
                :showLoading="showLoading"
                :disabled="disabled"
                :mini="mini"
                :recta="recta"
                :plain="plain"
                :actionType="actionType"
                :gradients="gradients"
                @buttonClick="buttonClick"
        >

        </btn>
    </div>
</template>
<script>
    import btn from '@common/finsuit-components/Button'
    export default {
        components: {
            btn
        },
        name: '',
        props: {
            text: {
                type: String,
                default: 'BTN'
            },
            showLoading: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            mini: {
                type: Boolean,
                default: false
            },
            recta: {
                type: Boolean,
                default: false
            },
            plain: {
                type: Boolean,
                default: false
            },
            actionType: {
                type: String,
                default: 'submit'
            },
            gradients: {
                type: Array,
                default: []
            }
        },
        data() {
            return {}
        },
        methods: {
            buttonClick() {
                this.$emit('buttonClick')
            }
        },
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