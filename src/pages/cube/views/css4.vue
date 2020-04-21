<template>
    <div>
        <a
                v-bind:href="url"
                class="nav-link"
        >
            <slot name="css4" v-bind:user="user">{{user.firstName}}</slot>
        </a>
    </div>
</template>
<script>
    export default {
        name: '',
        data() {
            return {
               user: {'firstName': 'zhang','lastName': 'shujun'}
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