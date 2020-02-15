<template>
    <div>
        <Tinymce ref="editor" v-model="postForm.content" :height="400" />
    </div>
</template>
<script>
    import Tinymce from '@common/finsuit-components/Tinymce'
    export default {
        components: {Tinymce},
        name: '',
        props: [],
        data() {
            return {
                postForm: {
                    content: ''
                }
            }
        },
        methods: {},
        computed: {},
        watch: {
            'postForm.content': function (xin,old) {
                console.log('old:'+ old)
                console.log('xin:'+ xin)
            }
        },
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