<template>
    <div>
        <smeditor :config='config'></smeditor>
    </div>
</template>
<script>
    export default {
        name: '',
        props: [],
        data() {
            return {
                config:{
                    // 接口地址
                    uploadUrl: '',
                    // form 里的 filename
                    uploadName: '',
                    // 其他参数
                    uploadParams: {},
                    // 上传成功回调
                    uploadCallback: (data) => {
                        console.log(data)
                        return 'blob:https://fiddle.jshell.net/00a0b0b4-d19a-4860-9796-137692aef36f'
                    },
                    // 上传失败回调, 可选
                    uploadFailed: (err) => {
                        console.log(err)
                    }
                }
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