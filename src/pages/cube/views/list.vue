<template>
    <div style=“height:100%”>
        <div style="height:200px;background:green"></div>
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        >
            <ul style=“height:100%”>
                <li v-for="(it,index) in list" :key="index">
                    {{it}}
                </li>
            </ul>
        </van-list>
        </van-pull-refresh>
    </div>
</template>
<script>
    export default {
        name: '',
        props: [],
        data() {
            return {
                refreshing: false,
                list: [],
                loading: false,
                finished: false,
            }
        },
        methods: {
             onLoad() {
                    setTimeout(() => {
                        if (this.refreshing) {
                        this.list = [];
                        this.refreshing = false;
                        }

                        for (let i = 0; i < 10; i++) {
                        this.list.push(this.list.length + 1);
                        }
                        this.loading = false;

                        if (this.list.length >= 31) {
                        this.finished = true;
                        }
                    }, 1000);
                },
                onRefresh() {
                // 清空列表数据
                this.finished = false;

                // 重新加载数据
                // 将 loading 设置为 true，表示处于加载状态
                this.loading = true;
                this.onLoad();
            }
        },
        computed: {},
        watch: {},
        created() {
            // console.log(this.$axios.get)
            // this.$axios.get('https://mock.yonyoucloud.com/mock/7094/','api/yiye/bankList').then((res) => {
                // this.list = res.data.data
            // })
        },
        mounted() {
        },
        destroyed() {
        },
    }
</script>
<style scoped>
    ul li{
        height: 200px;
        color: white;
    }
    ul li:nth-child(odd) {
        background: black;
    }
     ul li:nth-child(even) {
        background: red;
    }
</style>