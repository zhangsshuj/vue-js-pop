<template>
    <div>
        <van-button style="width:100%;height:50px;background:slategrey" type="default" @click="downloadFn">下载</van-button>
        <lunbo2_2></lunbo2_2>
    </div>
</template>
<script>
    import CallApp from 'callapp-lib'
    import lunbo2_2 from '../components/lunbo/lunbo2_2'
    export default {
        components: {
            lunbo2_2
        },
        name: '',
        props: [],
        data() {
            return {}
        },
        methods: {
            downloadFn() {
                console.log('下载')
                location.href = 'https://finsuit.bicai365.com/finsuit/static/finsuit/vue/#/mine/shareApp?SOURCE=OTHERS'
            },
            init() {
                const bicai = new CallApp({
                    scheme: { protocol: "besharp", host: "finsuit" },
                    intent: {
                        package: "com.bs.finance",
                        scheme: "besharp"
                    },
                    timeout: 2000,
                    //apple store
                    appstore: "https://itunes.apple.com/cn/app/%E6%AF%94%E8%B4%A2/id1149189800?mt=8",
                    //应用宝
                    yingyongbao: "https://android.myapp.com/myapp/detail.htm?apkName=com.bs.finance",
                    fallback: "http://192.168.10.115:8088/#/callApp" //唤端失败后跳转的地址
                });
//                bicai.open({
//                    path: 'applink'
//                })
//                generateScheme
                let u = navigator.userAgent;
                let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
                if (isAndroid) {
                    setTimeout(() => {
//                        generateIntent
                        window.location.href = bicai.generateScheme({
                            path: 'applink'
                        });
                    }, 1000);
                }
            }
        },
        computed: {},
        watch: {},
        created() {
        },
        mounted() {
            this.init()
        },
        destroyed() {
        },
    }
</script>
<style lang="scss" scoped>
    ul{
        display: flex;
        flex-wrap: nowrap;
        li{
            flex: 1;
            border: 1px solid red;
            img{
                width: 80px;
            }
        }
    }
</style>