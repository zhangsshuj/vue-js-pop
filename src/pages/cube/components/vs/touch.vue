<template>
    <div class="touch" ref="touch">
        <slot></slot>
    </div>
</template>
<script>
    import { windowInit } from './requestAnimationFrame'
    export default {
        name: '',
        props: ['width'],
        data() {
            return {
                additionalX: 50,  // 近似等于超出边界时最大可拖动距离(px);
                reBoundExponent: 10, // 惯性回弹指数(值越大，幅度越大，惯性回弹距离越长);
                sensitivity: 10000, // 灵敏度(惯性滑动时的灵敏度,值越小，阻力越大),可近似认为速度减为零所需的时间(ms);
                reBoundingDuration: 360, // 回弹过程duration;

                speed: 0, // 滑动速度(正常滑动时一般不会超过10);
                touching: false, // 是否处于touch状态;
                reBounding: false, // 是否处于回弹过程;
                translateX: 0,
                startX: 0,
                lastX: 0,
                currentX: 0,
                startMoveTime: 0,
                endMoveTime: 0,
                frameTime: .3, // 每个动画帧的ms数
                frameStartTime: 0,
                frameEndTime: 0,
                inertiaFrame: 0,
                zeroSpeed: 0.001, // 当speed绝对值小于该值时认为速度为0 (可用于控制惯性滚动结束期的顺滑度)
                acceleration: 0, // 惯性滑动加速度;


                // p判断左右滑还是上下滑
                sXStart: 0,
                sYStart: 0,
                eYEnd: 0,
                eXEnd: 0,
            }
        },
        watch: {
            style: {
                handler: function () {
                    this.$emit('style',this.style)
                },
                deep: true
            }
        },
        computed: {
            style () {
                return {
                    transitionTimingFunction: this.transitionTimingFunction,
                    transitionDuration: `${this.transitionDuration}ms`,
                    transform: `translate3d(${this.translateX}px, 0px, 0px)`
                }
            },
            transitionDuration () {
                if (this.touching || (!this.reBounding && !this.touching)) {
                    return 0
                }
                if (this.reBounding && !this.touching) {
                    return this.reBoundingDuration
                }
            },
            transitionTimingFunction () {
                return this.reBounding ? 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'cubic-bezier(0.1, 0.57, 0.1, 1)'
            },
            // 可视区宽度;
            viewAreaWidth () {
                return document.documentElement.clientHeight
            },
            // 可视区与可滑动元素宽度差值;
            listWidth () {
                return this.width - this.viewAreaWidth
            },
            // 是否向左惯性滚动;
            isMoveLeft () {
                return this.currentX <= this.startX
            },
            isMoveRight () {
                return this.currentX >= this.startX
            }
        },
        methods: {
            // start
            handleTouchStart (event) {
                console.log(this.width);
//                event.stopPropagation()
                console.log('::start::')
                console.log(event)
                console.log('::start::')
                cancelAnimationFrame(this.inertiaFrame)
                this.lastX = event.touches[0].clientX
                this.sXStart = event.touches[0].pageX
                this.sYStart = event.touches[0].pageY
            },

            // move
            handleTouchMove (event) {
                console.log('::move::')
                console.log(event)
                console.log('::move::')
                if (this.listWidth <= 0) return
                this.eXEnd = event.touches[0].pageX
                this.eYEnd = event.touches[0].pageY
                // 获取滑动距离
                let distanceX = this.eXEnd-this.sXStart;
                let distanceY = this.eYEnd-this.sYStart;
                //判断滑动方向
                if(Math.abs(distanceX)>Math.abs(distanceY) && distanceX>0){
                    console.log('往右滑动');
                    event.preventDefault()
                    event.stopPropagation()
                }else if(Math.abs(distanceX)>Math.abs(distanceY) && distanceX<0){
                    console.log('往左滑动');
                    event.preventDefault()
                    event.stopPropagation()
                }else if(Math.abs(distanceX)<Math.abs(distanceY) && distanceY<0){
                    console.log('往上滑动');
                }else if(Math.abs(distanceX)<Math.abs(distanceY) && distanceY>0){
                    console.log('往下滑动');
                }else{
                    console.log('点击未滑动');
                }
                this.touching = true
                this.startMoveTime = this.endMoveTime
                this.startX = this.lastX
                this.currentX = event.touches[0].clientX
                this.moveFollowTouch()
                this.endMoveTime = event.timeStamp // 每次触发touchmove事件的时间戳;
            },

            // end
            handleTouchEnd (event) {
                console.log('::end::')
                console.log(event)
                console.log('::end::')
                this.touching = false
                if (this.checkReboundX()) {
                    cancelAnimationFrame(this.inertiaFrame)
                } else {
                    let silenceTime = event.timeStamp - this.endMoveTime
                    let timeStamp = this.endMoveTime - this.startMoveTime
                    timeStamp = timeStamp > 0 ? timeStamp : 8
                    if (silenceTime > 100) return  // 停顿时间超过100ms不产生惯性滑动;
                    this.speed = (this.lastX - this.startX) / timeStamp
                    this.acceleration = this.speed / this.sensitivity
                    this.frameStartTime = new Date().getTime()
                    this.inertiaFrame = requestAnimationFrame(this.moveByInertia)
                }
            },

            // 如果需要回弹则进行回弹操作并返回true;
            checkReboundX () {
                this.reBounding = false
                if (this.translateX > 0) {
                    this.reBounding = true
                    this.translateX = 0
                } else if (this.translateX < -this.listWidth) {
                    this.reBounding = true
                    this.translateX = -this.listWidth
                }
                return this.translateX === 0 || this.translateX === -this.listWidth
            },

            bindEvent () {
                this.$el.addEventListener('touchstart', this.handleTouchStart, false)
                this.$el.addEventListener('touchmove', this.handleTouchMove, false)
                this.$el.addEventListener('touchend', this.handleTouchEnd, false)
            },

            removeEvent () {
                this.$el.removeEventListener('touchstart', this.handleTouchStart)
                this.$el.removeEventListener('touchmove', this.handleTouchMove)
                this.$el.removeEventListener('touchend', this.handleTouchEnd)
            },

            // touch拖动
            moveFollowTouch () {
                if (this.isMoveLeft) { // 向左拖动
                    if (this.translateX <= 0 && this.translateX + this.listWidth > 0 || this.translateX > 0) {
                        console.log(1)
                        this.translateX += this.currentX - this.lastX
                        console.log(this.translateX)
                        console.log(1)
                    } else if (this.translateX + this.listWidth <= 0) {
                        console.log(2)
                        console.log('translateX'+this.translateX)
                        console.log('listWidth'+this.listWidth)
                        console.log('currentX'+this.currentX)
                        console.log('lastX'+this.lastX)
                        console.log('viewAreaWidth'+this.viewAreaWidth)
                        this.translateX += this.additionalX * (this.currentX - this.lastX)
                            / (this.viewAreaWidth + Math.abs(this.translateX + this.listWidth))
                        console.log(this.translateX)
                        console.log(2)
                    }
                } else { // 向右拖动
                    if (this.translateX >= 0) {
                        this.translateX += this.additionalX * (this.currentX - this.lastX)
                            / (this.viewAreaWidth + this.translateX)
                    } else if ((this.translateX <= 0 && this.translateX + this.listWidth >= 0) ||
                        this.translateX + this.listWidth <= 0) {
                        this.translateX += this.currentX - this.lastX
                    }
                }
                this.lastX = this.currentX
            },

            // 惯性滑动
            moveByInertia () {
                this.frameEndTime = new Date().getTime()
                this.frameTime = this.frameEndTime - this.frameStartTime
                if (this.isMoveLeft) { // 向左惯性滑动;
                    if (this.translateX <= -this.listWidth) { // 超出边界的过程;
                        // 加速度指数变化;
                        this.acceleration *= (this.reBoundExponent +
                            Math.abs(this.translateX + this.listWidth)) /
                            this.reBoundExponent
                        this.speed = Math.min(this.speed - this.acceleration, 0) // 为避免减速过程过短，此处加速度没有乘上frameTime;
                    } else {
                        this.speed = Math.min(this.speed - this.acceleration * this.frameTime, 0)
                    }
                } else if (this.isMoveRight) { // 向右惯性滑动;
                    if (this.translateX >= 0) {
                        this.acceleration *= (this.reBoundExponent + this.translateX) / this.reBoundExponent
                        this.speed = Math.max(this.speed - this.acceleration, 0)
                    } else {
                        this.speed = Math.max(this.speed - this.acceleration * this.frameTime, 0)
                    }
                }
                this.translateX += this.speed * this.frameTime / 2
                if (Math.abs(this.speed) <= this.zeroSpeed) {
                    console.log('回弹')
                    this.checkReboundX()
                    return
                }
                this.frameStartTime = this.frameEndTime
                this.inertiaFrame = requestAnimationFrame(this.moveByInertia)
            },
        },
        created() {
        },
        mounted() {
            windowInit()
            this.bindEvent()
        },
        destroyed() {
            this.removeEvent()
        },
    }
</script>
<style lang="scss" scoped>

</style>