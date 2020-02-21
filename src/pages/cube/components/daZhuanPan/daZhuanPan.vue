<template>
    <div>
        <canvas id="canvas-daZhuanPan" width="422" height="422">
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
                var canvas = document.getElementById('canvas-daZhuanPan'),
                    context = canvas.getContext('2d');

                new ScratchCard.RouletteWheel({
                    centerX:       canvas.width / 2,
                    centerY:       canvas.height / 2,
                    outsideRadius: 200,

                    awards: [
                        {type: 'text', content: 'iphone8'},
                        {type: 'text', content: '大保健'},
                        {type: 'text', content: '10元话费'},
                        {type: 'image', content: 'https://img12.360buyimg.com/n7/jfs/t4807/209/1436278963/496606/8e486549/58f0884eNcec87657.jpg'},
                        {type: 'losing', content: '未中奖'}
                    ],

                    finish: function (index) {
                        switch(this.awards[index].type) {
                            case 'text':
                                alert('🎉恭喜您中得：' + this.awards[index].content);
                                break;
                            case 'image':
                                alert('🎉恭喜您中得：战争磨坊水冷机箱');
                                break;
                            case 'losing':
                                alert('💔很遗憾，您没有中奖~');
                                break;
                        }
                    }

                }).render(canvas, context)
            }
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
    #canvas-daZhuanPan{
        width: 550px;
        height:550px;
    }
</style>