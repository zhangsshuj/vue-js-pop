<template>
    <div>
        <canvas id="canvas-music" width="250" height="50">
        </canvas>
    </div>
</template>
<script>
    import ScratchCard from "./luckyDraw.js";
    export default {
        name: '',
        props: [],
        data() {
            return {}
        },
        methods: {
            // 呱呱了
            initGuaGuaLe() {
                var canvas1 = document.getElementById('canvas-music'),
                    context1 = canvas1.getContext('2d');

                new ScratchCard.ScratchCard({
                    awardBackgroundImage: 'http://tse3.mm.bing.net/th?id=OIP.X7zblF16pKGur6refGZsWQEsDg&pid=15.1'
                }).render(canvas1, context1);
            },
        },
        computed: {},
        watch: {},
        created() {
        },
        mounted() {
            this.initGuaGuaLe()
        },
        destroyed() {
        },
    }
</script>
<style lang="scss" scoped>

</style>