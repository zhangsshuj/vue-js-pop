<template>
    <div id="css">
        <css1 :hh="hh" @click.native="$root.dosome">
            <template v-slot:one>
            </template>
        </css1>
        <css2 v-model="aa" @click.native="aaFn">2222</css2>
        <css3 #san type="test">33333</css3>
        <css4>
            <template v-slot:css4="slotProps">
                {{ slotProps.user.lastName }}
            </template>
        </css4>
    </div>
</template>
<script>
    import css1 from './css1.vue'
    import css2 from './css2.vue'
    import css3 from './css3.vue'
    import css4 from './css4.vue'
    export default {
        components: {css1,css2,css3,css4},
        name: '',
        props: [],
        data() {
            return {
                aa:123,
                hh: [{a:1},{a:2},{a:3}],
                todos: [ {text: 'c',id: '1',isComplete:true},
                    {text: 'd',id: '2',isComplete:true}]
            }
        },
        methods: {
            aaFn() {
                this.aa = 4561
            },
            getMap() {
                return 100
            },
            add1() {
//                var arr1=[1,2,3,4,5,6,7,8,9];
//                console.log(arr1.reduce((l, it, index, arr) => l += it, 0));

//                var arr1 = ['abc','abcd','sss','2','d','t','2','ss','f','22','d']
//                console.log([...new Set(arr)])
//                console.log(typeof new Set(arr))
//                   var obj = {}
//                   var arr = []
//                arr1.forEach((v,i) => {
//                    if (!obj[v]) {
//                        obj[v] = 1
//                        arr.push(v)
//                    }
//                   })
//                console.log(arr)
//                var num = 100
//                var bibao = function () {
//                    var num = 1
//                    function aa() {
//                        console.log(num)
//                    }
//                    aa()
//                }
//                bibao()
//            }
//                var obj = {}
//                var str = 'asdfssaaasasasasaa'
//                var arr = str.split("")
//                arr.forEach((v,i) => {
//                    if (!obj[v]) {
//                        obj[v] = 1
//                    } else {
//                        obj[v] += 1
//                    }
//                })
//                console.log(obj)
        },
        },
        computed: {},
        watch: {
            aa() {
                console.log('aa',this.aa)
            }
        },
        created() {
        },
        provide:function () {
            return {
                getMap: this.getMap
            }
        },
        mounted() {
          this.add1()
        },
        destroyed() {
        },
    }
</script>
<style lang="scss" scoped>
    .css1{
        /*<!--width: 200px;-->*/
        /*<!--height: 200px;-->*/
        /*<!--position: fixed;-->*/
        /*<!--left: 50%;-->*/
        /*<!--top: 50%;-->*/
        /*<!--transform: translate(-50%);-->*/
        /*<!--background: red;-->*/

        /*<!--width: 200px;-->*/
        /*<!--height: 200px;-->*/
        /*<!--position:absolute;-->*/
        /*<!--top:50%;-->*/
        /*<!--left:50%;-->*/
        /*<!--margin-left:-100px;-->*/
        /*<!--height:-100px;-->*/
        /*<!--z-index:1000;-->*/
        /*<!--background: red;-->*/



        /*display: flex;*/
        /*flex-wrap: nowrap;*/
        /*.lt{*/
            /*width: 100px;*/
            /*height: 100px;*/
            /*background: red;*/
        /*}*/
        /*.rt{*/
            /*width: 100px;*/
            /*height: 100px;*/
            /*background: orange;*/
        /*}*/
        /*.mt{*/
            /*width: 100%;*/
            /*height: 100px;*/
            /*background: green;*/
        /*}*/


        /*.lt,.rt{width: 200px;height: 200px; background-color: #ffe6b8;position: absolute;top:120px;}*/
        /*.lt{left:0px;}*/
        /*.rt{right: 0px;}*/
        /*.mt{margin:2px 210px ;background-color: #eee;height: 200px; }*/
    }
</style>