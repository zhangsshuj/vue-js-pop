<template>
  <div class="about" v-scroll>
    <ScrollFixedEnd @scrollEnd="isHidden = false" @scroll="isHidden= true">
      <div id="imgShare1">
        <a href="http://www.baidu.com" v-on:click.self.prevent="console(1)">test</a>
        <a href="javascript:void(0);" class="share-btn" :class="{'animeta-hidden':isHidden}" @click="shareFn"></a>
        <div class="ui">
          <h1>组件调用<<>>BUTTON</h1>
          <btn text="showLoading" :showLoading="true"></btn>
          <btn text="disabled" :disabled="true"></btn>
          <btn text="mini" :mini="true"></btn>
          <btn text="recta" :recta="true"></btn>
          <btn text="plain" :plain="true"></btn>
          <btn text="submit" actionType="submit"></btn>
          <btn text="reset" actionType="reset"></btn>
          <btn text="button" actionType="button"></btn>
          <btn text="gradients" :gradients="['#fff','#FF5853']"></btn>
        </div>
        <div class="ui">
          <h1>组件调用<<>>Confirm</h1>
          <btn :gradients="['#fff','#a2ff41']" text="$iosAlert" @buttonClick="ConfirmFn('$iosAlert')"></btn>
          <btn :gradients="['#fff','#a2ff41']" text="$iosConfirm" @buttonClick="ConfirmFn('$iosConfirm')"></btn>
          <btn :gradients="['#fff','#a2ff41']" text="$iosPrompt" @buttonClick="ConfirmFn('$iosPrompt')"></btn>
          <btn :gradients="['#fff','#a2ff41']" text="$iosRemind" @buttonClick="ConfirmFn('$iosRemind')"></btn>
        </div>
        <div class="ui">
          <h1>组件调用<<>>EllipsisText</h1>
          <EllipsisText clamp="2" text="顺德人感受到郭德纲ssssssssssssssssssssssssssssssdsfsdfsdf顺德人感受到郭德纲ssssssssssssssssssssssssssssssdsfsdfsdf顺德人感受到郭德纲ssssssssssssssssssssssssssssssdsfsdfsdf顺德人感受到郭德纲ssssssssssssssssssssssssssssssdsfsdfsdf顺德人感受到郭德纲ssssssssssssssssssssssssssssssdsfsdfsdf顺德人感受到郭德纲ssssssssssssssssssssssssssssssdsfsdfsdf顺德人感受到郭德纲ssssssssssssssssssssssssssssssdsfsdfsdf顺德人感受到郭德纲ssssssssssssssssssssssssssssssdsfsdfsdf顺德人感受到郭德纲ssssssssssssssssssssssssssssssdsfsdfsdf顺德人感受到郭德纲ssssssssssssssssssssssssssssssdsfsdfsdf"></EllipsisText>
        </div>
        <div class="ui">
          <h1 @click="isEmptyData=!isEmptyData">组件调用<<>>EmptyData</h1>
          <EmptyData v-if="isEmptyData"></EmptyData>
        </div>
        <div class="ui">
          <h1 @click="HttpErrorDialogFn">js调用<<>>HttpErrorDialog</h1>
        </div>
        <div class="ui">
          <h1 @click="LoadingFn">js调用<<>>Loading</h1>
        </div>
        <div class="ui">
          <h1 @click="isMaskBox=!isMaskBox">组件调用<<>>MaskBox</h1>
          <MaskBox v-model="isMaskBox" :showLoading="false" :defaultcloseBtnVisible="true" :isTransparent="false" :hideOnBlur="true" @on-show="$modalHelper.open()" @on-hide="$modalHelper.close()">
            <div style="width: 300px;color:#fff;background: #000;height: 300px"> zczxczxc</div>
          </MaskBox>
        </div>
        <div class="ui">
          <h1 @click="dialogFn">js调用<<>>MaskBox</h1>
        </div>
        <div class="ui">
          <h1 @click="isPopup=!isPopup">组件调用<<>>popup</h1>
          <Popup v-model="isPopup" position="bottom" :show-mask="true" :hide-on-blur="true" :is-transparent="false" @on-show="$modalHelper.open" @on-hide="$modalHelper.close">
            <div style="height: 200px;background: gold">123</div>
          </Popup>
        </div>
        <div class="ui">
          <h1 @click="isScroll=!isScroll">组件调用<<>>scroll</h1>
          <Scroll v-if="isScroll" :listenScroll="true" :pullup="true" :pulldown="true" @scroll="scrollFn" @scrollToEnd="scrollToEnd">
            <div style="height: 1000px;background: #000">wer</div>
          </Scroll>
        </div>
        <div class="ui">
          <h1 @click="ThrowNewPageFn">js调用<<>>ThrowNewPage</h1>
        </div>
        <div class="ui">
          <h1 @click="ToastFn">组件调用<<>>Toast</h1>
        </div>
        <div class="ui">
          <h1>二维码生成《长按识别》</h1>
          <img :src="qrcodeSrc" style="margin: auto">
        </div>
        <div class="ui">
          <h1 @click="autoHtml2canvas">截取屏幕</h1>
          <img v-if="canvasSrc" :src="canvasSrc" style="margin:auto">
        </div>
        <div class="ui">
          <h1>图片大转盘</h1>
          <Turnplate ref="Turnplate" @on-click="btnClick" @gameOver="gameOver"  pointerbg="light":gameCoverImg="gameCoverImg"></Turnplate>
        </div>
        <div class="ui">
          <h1>canves可配置大转盘1</h1>
          <Turnplate1 ref="Turnplate1" @on-click1="btnClick1" @gameOver1="gameOver1" :list="cList"></Turnplate1>
        </div>
        <!--<div class="ui">-->
          <!--<h1>canves可配置大转盘2</h1>-->
          <!--<daZhuanPan ref="Turnplate2"></daZhuanPan>-->
        <!--</div>-->
        <div class="ui">
          <h1>九宫格</h1>
          <div class="lottery-box lamp-animation">
            <div class="lottery-main">
              <canvas id="canvas" width="500px" height="375px"></canvas>
              <div class="btn" :class="{'btn-disabled':btnDisabled}" @click="startTurn">
                <p>点击抽奖</p>
                <!-- APP内文案 -->
                <template>
                  <span>你有1次抽奖机会</span>
                  <span>分享获得抽奖机会</span>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="ui">
          <h1>刮刮乐</h1>
          <scratchMusic></scratchMusic>
        </div>
        <div class="ui">
          <btn @click.native="$refs.fanfanpan.ceshi" text="测试" :gradients="['#fff','#FF5853']"></btn>
          <btn @click.native="$refs.fanfanpan.turn" text="翻盘" :gradients="['#fff','#FF5853']"></btn>
          <btn @click.native="$refs.fanfanpan.shuffle" text="洗盘" :gradients="['#fff','#FF5853']"></btn>
          <btn @click.native="$refs.fanfanpan.show" text="明盘" :gradients="['#fff','#FF5853']"></btn>
          <fanfanpan ref="fanfanpan" :lotteryData="lotteryData"></fanfanpan>
        </div>
        <div class="ui">
          <btn @click.native="getBrowserFn" text="获取版本信息..." :gradients="['#fff','#FF5853']"></btn>
          <pre style="text-align: left;white-space: pre-line">
            UA:{{getBrowserInfo.UA}}
            BROWSER:{{getBrowserInfo.BROWSER}}
            BROWSER_VERSION:{{getBrowserInfo.BROWSER_VERSION}}
            BROWSER_NAME:{{getBrowserInfo.BROWSER_NAME}}
            OS:{{getBrowserInfo.OS}}
            OS_VERSION:{{getBrowserInfo.OS_VERSION}}
            NETWORK_TYPE:{{getBrowserInfo.NETWORK_TYPE}}
          </pre>
        </div>
        <div class="ui">
          <h1>解决微信ios中input失去焦点不回弹问题</h1>
          <input v-wxBlur type="text" style="width: 100%;height: 50px">
        </div>
        <div class="ui">
          <h1>图标symbol</h1>
          <ul class="icon-box">
            <li>
              <svg class="icon dianying" aria-hidden="true">
                <use xlink:href="#icon-dianying1"></use>
              </svg>
            </li>
            <li>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiangji"></use>
              </svg>
            </li>
            <li>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shandian1"></use>
              </svg>
            </li>
            <li>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zhiwen"></use>
              </svg>
            </li>
            <li>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-guanzhu"></use>
              </svg>
            </li>
            <li>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-anquan"></use>
              </svg>
            </li>
            <li>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-chenggong"></use>
              </svg>
            </li>
            <li>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-riqian"></use>
              </svg>
            </li>
            <li>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-youhuiquan"></use>
              </svg>
            </li>
            <li>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-WIFI"></use>
              </svg>
            </li>
          </ul>
        </div>
        <div class="ui">
          <h1 @click="isColor = !isColor">vue指令</h1>
          <div v-tipBak:[isColor]="{color: 'red'}"></div>
        </div>
        <div class="ui">
          <h1>状态持久化</h1>
          <div>
            {{feed}}
          </div>
        </div>
        <div class="ui">
          <h1 @click="$router.push({path:'vs'})">账户vs</h1>
        </div>
        <div class="ui">
          <h1 @click="$router.push({path: '/editor'})">编辑器1</h1>
        </div>
        <div class="ui">
          <h1 @click="$router.push({path: '/editor1'})">编辑器2</h1>
        </div>
        <div class="ui">
          <h1 @click="$router.push({path: '/editor2'})">编辑器3</h1>
        </div>
        <div class="ui">
          <h1>图标unicode</h1>
          <span class="iconfont">&#xe663</span>
        </div>
        <div class="ui">
          <h1>图标icon-class</h1>
          <span class="iconfont icon-zengjiasuojin"></span>
          <span class="iconfont icon-jianshaoasuojin"></span>
          <span class="iconfont icon-youduiqi"></span>
        </div>
        <div class="ui">
          <h1 @click="$router.push({path: '/css'})">css</h1>
        </div>
        <div class="ui">
          <h1 @click="getParentWin('set')">set父window的值</h1>
          <h1 @click="getParentWin('get')">get父window的值</h1>
        </div>
      </div>
    </ScrollFixedEnd>
  </div>
</template>
<script>
  import btn from '../components/button'
  import EllipsisText from '../components/EllipsisText'
  import EmptyData from '../components/EmptyData'
  import HttpErrorDialog from '@common/finsuit-components/HttpErrorDialog'
  import Loading from '@common/finsuit-components/Loading'
  import MaskBox from '@common/finsuit-components/MaskBox'
  import dialog from '../components/dialog'
  import Popup from "@common/finsuit-components/Popup"
  import Scroll from "@common/finsuit-components/Scroll"
  import ScrollFixedEnd from "@common/finsuit-components/ScrollFixedEnd"
  import ThrowNewPage from "@common/finsuit-components/ThrowNewPage"
  import Toast from "@common/finsuit-components/Toast"
  import QRCode from "qrcode"
  import html2canvas from "html2canvas"
  const Turnplate = () => import(/* webpackChunkName: "Turnplate" */ "@llz/components/Turnplate/index.vue");
  const Turnplate1 = () => import(/* webpackChunkName: "Turnplate" */ "@llz/components/Turnplate/canvesIndex.vue");
  import scratchMusic from  "../components/guaGuaLe/scratchMusic.vue";
  import daZhuanPan from  "../components/daZhuanPan/daZhuanPan.vue";
  import fanfanpan from  "../components/fanfanpan";
  import Sudoku from "../components/lottery/Sudoku.js";
  import {mapState,mapActions} from 'vuex'
  export default {
      components: {btn,EllipsisText,EmptyData,MaskBox,Popup,Scroll,ScrollFixedEnd,Turnplate,Turnplate1,scratchMusic,daZhuanPan,fanfanpan},
      data() {
          return {
            cross: null,
            config : {
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
            },
            isColor: false,
            getBrowserInfo: {},
            lotteryData:[ // 翻盘数据
                  {
                  id: 1,
                  front_img: "https://finsuit.oss-cn-beijing.aliyuncs.com/CJ/2773e125-bd02-4f84-8691-8a7e44cc85d4.png",
                  back_img: "https://finsuit.oss-cn-beijing.aliyuncs.com/CJ/f3d6e8c7-96d8-4084-bfd2-4fc4063c4ff7.jpg",
              },
                  {
                      id: 2,
                      front_img: "https://finsuit.oss-cn-beijing.aliyuncs.com/CJ/92e126b9-e304-48f7-9937-f42c92026b5c.png",
                      back_img: "https://finsuit.oss-cn-beijing.aliyuncs.com/CJ/f3d6e8c7-96d8-4084-bfd2-4fc4063c4ff7.jpg",
                  },
                  {
                      id: 3,
                      front_img: "https://finsuit.oss-cn-beijing.aliyuncs.com/CJ/47b41c52-a097-4c75-9ee3-21882f4f6dfe.jpg",
                      back_img: "https://finsuit.oss-cn-beijing.aliyuncs.com/CJ/f3d6e8c7-96d8-4084-bfd2-4fc4063c4ff7.jpg",
                  },
                  {
                      id: 4,
                      front_img: "https://finsuit.oss-cn-beijing.aliyuncs.com/CJ/eab332f8-5bec-42b7-9f64-82a2ff009e75.png",
                      back_img: "https://finsuit.oss-cn-beijing.aliyuncs.com/CJ/f3d6e8c7-96d8-4084-bfd2-4fc4063c4ff7.jpg",
                  },
                  {
                      id: 5,
                      front_img: "https://finsuit.oss-cn-beijing.aliyuncs.com/CJ/24d34cf5-5f1b-493c-89e6-dcc8eaea154c.png",
                      back_img: "https://finsuit.oss-cn-beijing.aliyuncs.com/CJ/f3d6e8c7-96d8-4084-bfd2-4fc4063c4ff7.jpg",
                  },
                  {
                      id: 6,
                      front_img: "https://finsuit.oss-cn-beijing.aliyuncs.com/CJ/65413cfe-8a6a-4fb9-8cc7-67382f23fb55.jpg",
                      back_img: "https://finsuit.oss-cn-beijing.aliyuncs.com/CJ/f3d6e8c7-96d8-4084-bfd2-4fc4063c4ff7.jpg",
                  },
                  {
                      id: 7,
                      front_img: "https://finsuit.oss-cn-beijing.aliyuncs.com/CJ/443c9e09-061b-4ff7-bccb-2b22bc3ab02d.png",
                      back_img: "https://finsuit.oss-cn-beijing.aliyuncs.com/CJ/f3d6e8c7-96d8-4084-bfd2-4fc4063c4ff7.jpg",
                  },
                  {
                      id: 8,
                      front_img: "https://finsuit.oss-cn-beijing.aliyuncs.com/CJ/be855646-caf5-4206-8383-0b3d66d10239.png",
                      back_img: "https://finsuit.oss-cn-beijing.aliyuncs.com/CJ/f3d6e8c7-96d8-4084-bfd2-4fc4063c4ff7.jpg",
                  },
                  {
                      id: 9,
                      front_img: "https://finsuit.oss-cn-beijing.aliyuncs.com/CJ/05092963-6f47-4652-92d5-83e2e9262c21.png",
                      back_img: "https://finsuit.oss-cn-beijing.aliyuncs.com/CJ/f3d6e8c7-96d8-4084-bfd2-4fc4063c4ff7.jpg",
                  }],
            cList: [
                  {title: '奖品1'},
                  {title: '奖品2'},
                  {title: '奖品3'},
                  {title: '奖品4'},
                  {title: '奖品5'},
                  {title: '奖品6'},
                  {title: '奖品7'},
                  {title: '奖品8'},
                  {title: '奖品9'},
                  {title: '奖品10'}
              ], // canves 可配置
            jiuGongGeinx: 0,
            btnDisabled:false,
            context: "", // 九宫格实例画笔
            sudoku: "",  // 九宫格实例
            isEmptyData: false,
            isMaskBox: false,
            isPopup: false,
            isScroll: false,
            isHidden: false,
            qrcodeSrc: "", //二维码地址
            canvasSrc: "", //二维码地址
            gameCoverImg: require("../assets/turnplate-bg.png"),
            noclick: true,
            prizeList: ['2元红包','iphoneX','4元红包','戴森吹风机','8元红包','38元红包','爱奇艺年卡','19元红包','华为p30'],
            awards: [
                {type:'image',content: require('../components/lottery/prize-1.png'),name: '奖品1'},
                {type:'image',content: require('../components/lottery/prize-1.png'),name: '奖品2'},
                {type:'image',content: require('../components/lottery/prize-1.png'),name: '奖品3'},
                {type:'image',content: require('../components/lottery/prize-1.png'),name: '奖品4'},
                {type:'image',content: require('../components/lottery/prize-1.png'),name: '奖品5'},
                {type:'image',content: require('../components/lottery/prize-1.png'),name: '奖品6'},
                {type:'image',content: require('../components/lottery/prize-1.png'),name: '奖品7'},
                {type:'image',content: require('../components/lottery/prize-1.png'),name: '奖品8'}            ]
          }
      },
      computed: {
          ...mapState({
              feed: state => state.feedback.quesData
          })
      },
      created() {
        console.log('f-1')
      },
      mounted() {
        console.log('f-2')
          this.cross = null
          this.cross = new this.$storageCross({})
          this.sendQuesData([{a:1,b:2}]).then(() => {
              console.log('finsh')
          })
//          this.$store.dispatch('sendQuesData',[{a:1,b:2}]).then(()=> {
//              console.log('my-1')
//          })
          this.$localStore('set','p1',{a:1})
          setTimeout(()=>{this.$localStore('get','p1',{}, (res)=> {
              console.log('hddl')
              console.log(res)
              this.$localStore('set','p2',{b:1})
              this.$localStore('set','p3',{c:1})
          })},6000)
//          setTimeout(()=>{this.$store.commit('setQuesData',[{a:1,b:4}])},6000)
          this.$nextTick(() => {
              this.init();
              this.initJiuGongGe()
          });
          if (window.history && window.history.pushState) {
              history.pushState({a:1}, 'hello', document.URL); // 向history添加新记录
              window.addEventListener('popstate', this.cancel, false);
          }
      },
      destroyed(){
        console.log('f-3')
          window.removeEventListener('popstate', this.cancel, false);
      },
      methods: {
          getParentWin(type) {
              this.cross = null
              if (type == 'set') {
                  this.cross = new this.$storageCross({ key: 'test2', val: '2', type: 'setItem', callBack: function(res) {
                      console.log(res)
                  }
                  }).postMessage()
              } else {
                  this.cross = new this.$storageCross({ key: 'loglevel:webpack-dev-server', type: 'getItem', callBack: function(res) {
                      console.log(res)
                  }
                  }).postMessage()
              }
          },
        ...mapActions({
            sendQuesData: 'feedback/sendQuesData'
        }),
        cancel: function(event) {
            if(this.$route.query.ACTITY_ID){
                this.$router.replace({
                    path:'/'
                })
            }else{
                this.$router.go(-1);
            }
          },
      touchmoveFn(res) {
         console.log(res)
      },
      // 获取信息
      getBrowserFn() {
        this.getBrowserInfo = this.$browser
      },
      // 九宫格
      initJiuGongGe () {
          var canvas = document.getElementById("canvas");
          this.context = canvas.getContext("2d");

          this.sudoku = new Sudoku({
              sudokuSize: canvas.width,
              sudokuItemRadius: 8,                                // 方块圆角阔值
              sudokuItemPadding: 2,                              // 方块间padding值
              sudokuItemScale: 1.4,                               // 是否变形 比如：正方形或者长方形
              sudokuItemMargin: 12,                               // 方块间marggin值
              sudokuItemShadowOffsetY: 6,                         // 方块阴影偏移量

              sudokuItemUnactiveColor: "#fff",                    // 方块背景颜色
              // sudokuItemUnactiveTxtColor:"#fff",               // 文字颜色
              sudokuItemUnactiveShadowColor: "#ffcec0",           // 方块阴影颜色

              sudokuItemActiveColor: "#ffe201",                   // 跳动方块颜色
              // sudokuItemActiveTxtColor:"#fff",                 // 跳动方块文字颜色
              sudokuItemActiveShadowColor: "#f79c00",             // 跳动方块阴影颜色

              // buttonColor:"#000",                              // 按钮背景颜色
              // buttonTxtColor:"#fff",                           // 按钮文字颜色
              // buttonShadowColor:"#ccc",                        // 按钮阴影颜色

              duration: 3000,                                     //中奖后动画停止的时间
              velocity: 400,                                      // 动画结尾转动速率
              speed: 50,                                          // loading = true 状态下转动的速度
              hasButton: "false",                                 // 九宫格是否自带按钮
              // delaultActiveIndex:5,                            // 当前已中奖的方块

              awards: this.awards,

              // 九宫格停止后的回调
              finish: (gamePositionIndex) => {
                  if (gamePositionIndex == this.jiuGongGeinx) {
                      Toast({message: `中奖了:${this.awards[gamePositionIndex].name}`})
                  } else {
                      Toast({message: '很遗憾'})
                  }
              },

              // 九宫格自身按钮点击后触发 hasButton = “true” 时有效
              onClick: () => { },

              // 九宫格每格跳动时触发
              nextTick: (nextIndex) => { }
          });

          this.sudoku.render(canvas, this.context);
      },
      // 开始转动 进入loading阶段
      startTurn () {
          this.sudoku.luckyDraw(this.context);
          setTimeout(()=>{
              this.jiuGongGeinx = Math.floor(Math.random()*9)
              this.sudoku.prize(this.jiuGongGeinx);
          },100)
      },
      // 抽奖按钮
      btnClick1() {
          if (!this.noclick) {
              return
          }
          this.noclick = false
          let index = Math.floor(Math.random()*9)
          this.gameGoto1(index)
      },
      gameOver1(index) {
          console.log('qq')
          console.log(index)
          Toast({message:`恭喜您获得${this.cList[index].title}`})
          this.noclick = true
      },
      // 中奖后，转动到指定奖品位置
      gameGoto1 (index) {
          if (typeof index !== "number") {
              this.$Toast("抽奖出错,请稍候再试");
              return;
          }

          // 开始转动转盘到指定的角度
          this.$refs["Turnplate1"].goto(index);
      },
      // 抽奖按钮
      btnClick() {
          if (!this.noclick) {
              return
          }
          this.noclick = false
          let index = Math.floor(Math.random()*9)
          this.gameGoto(index)
      },
      gameOver(index) {
          console.log('qq')
          Toast({message:`恭喜您获得${this.prizeList[index]}`})
          this.noclick = true
      },
      // 中奖后，转动到指定奖品位置
      gameGoto (index) {
          if (typeof index !== "number") {
              this.$Toast("抽奖出错,请稍候再试");
              return;
          }
          // 中奖后，计算转盘准备停止的目标角度
          var angles = index * (360 / 9);

          // 开始转动转盘到指定的角度
          this.$refs["Turnplate"].goto(angles,index);
      },
      init() {
          this.generateQRCode()
      },
      shareFn() {
          console.log('share')
          this.$createShareImage((cb) => {
              console.log(1314)
              dialog({componentName:'shareImg',showLoading:false,imgSrc:cb})
          })
      },
      // 生成二维码
      generateQRCode() {
          // 二维码&链接
          let _this = this;
          let url = this.$Config.resPacketServerHost;
          url += "#/";
          url += `?FROM_APP_FLAG=BC`;
          url += `&ACTITY_ID=122`;
          url += `&SHARE_MEMBER_ID=112`;
          url += `&SHARE_DATE=1`;
          console.log("二维码地址", url);
          QRCode.toDataURL(
              url,
              {
                  margin: 1
              },
              function(err, url) {
                  console.log(_this.qrcodeSrc)
                  _this.qrcodeSrc = url;
              }
          );
      },
      // canvas 截取
      // 截要分享的图片
      autoHtml2canvas() {
          let that = this
          html2canvas(document.getElementById("imgShare1"), {
              scale: 1,
              useCORS: true
          }).then(function(canvas) {
              var context = canvas.getContext("2d");
              var testImg = canvas.toDataURL("image/jpeg", 1);
              that.canvasSrc = testImg
          });
      },
      // confirm 弹框
      ConfirmFn(type) {
          console.log(type)
         switch (type) {
             case '$iosAlert':
                 this.$iosAlert({title: '$iosAlert',text: '123'})
                 break;
             case '$iosConfirm':
                 this.$iosConfirm({title: '$iosConfirm',text: '123'}).then((res) => {
                     console.log('res')
                 },(err) => {
                     console.log('err')
                 })
                 break;
             case '$iosPrompt':
                 this.$iosPrompt({title: '$iosPrompt',text: '123', placeholder: '请输入'}).then((res) => {
                     console.log('res')
                 }, (err) => {
                     console.log('err')
                 })
                 break;
             case '$iosRemind':
                 this.$iosRemind({title: '$iosRemind',text: '123'})
                 break;
         }
      },
      //HttpErrorDialog
      HttpErrorDialogFn() {
          HttpErrorDialog({btnCallback:this.btnCallback,desc:'描述',title:'比财',btnTxt:'确定',content:'content',linkTxt: 'https://www.baidu.com'})
      },
      btnCallback() {
          HttpErrorDialog().visible = false
      },
      // LoadingFn
      LoadingFn() {
          let Load = Loading({message:'hello'})
          Load.show()
          setTimeout(()=>{Load.close()},1000)
      },
      // dialogFn
      dialogFn() {
          let dog = dialog({componentName:'companent1',showLoading:false,title:'分享1',value:111,btn: '分享1'})
          setTimeout(()=>{
              dog.propsData.title = '分享2'
              dog.propsData.value = 222
              dog.propsData.btn = '分享2'
              dog.propsData.btnCallBack = this.btnCallBack
              dog.propsData.componentName = 'companent2';
          },3000)
      },
      btnCallBack() {
          console.log('分享2')
      },
      scrollToEnd() {
          console.log('end')
      },
      scrollFn(pop) {
          console.log('scroll',pop)
      },
      ThrowNewPageFn() {
          let tPage = ThrowNewPage({componentName:'NETWORK_ERROR_PAGE',onClick:this.btnCallBack})
      },
      ToastFn() {
          let toa = Toast({message:'toast',duration: 1000})
      }

  }
  }
</script>
<style lang="scss" scoped>
  .about{
    position: relative;
  }
  .dianying{
    fill: red;
  }
  .icon-box{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    li{
      width: 5em;
    }
  }
  .ui{
    margin-bottom: 50px;
  }
  .share-btn {
    width: 90px;
    height: 83px;
    background: url(../assets/share-icon.png) no-repeat;
    background-size: 100%;
    position: fixed;
    z-index: 10;
    left: 627px;
    top: 379px;
    transition: all 0.3s ease-in-out;
    transform: translateX(0%);
  }
  .animeta-hidden {
    transform: translateX(75px);
  }


  .lottery-box {
    width: 710px;
    height: 579px;
    margin: 0 auto;
    background: #feaca9 url("../components/lottery/lamp.png") no-repeat;
    background-size: 99.5% 99.5%;
    background-position: center center;
    border-radius: 20px;
    display: flex;
    align-items: center;
    border: 10px solid #feaca9;
    box-sizing: border-box;
  }

  .lottery-main {
    width: 638px;
    height: 499px;
    background: #e25341;
    margin: 0 auto;
    border-radius: 20px;
    position: relative;
    border: 5px solid #e25341;
    /* box-sizing: border-box; */
  }

  .lottery-main canvas {
    width: 638px;
    height: 499px;
  }

  .lottery-main .btn {
    width: 200px;
    height: 146px;
    border-radius: 10px;
    /* background: #ffe201; */
    background: repeating-linear-gradient(
                    -45deg,
                    #ffd901 0,
                    #ffd901 5px,
                    #ffe201 0,
                    #ffe201 20px
    );

    color: #fff;
    box-shadow: 0px 10px 1px 0px #f79c00;
    /* line-height: 153px; */
    position: absolute;
    left: 219px;
    top: 170px;
    color: #d92a00;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
  }

  .lottery-main .btn p {
    font-size: 34px;
    font-weight: 600;
    line-height: 60px;
  }

  .lottery-main .btn span {
    font-size: 22px;
  }

  .lottery-main .btn-disabled {
    background: #ddd;
    box-shadow: 0px 10px 1px 0px #ccc;
    color: #999;
  }

  /* 跑马灯 */
  .lamp-animation {
    animation: lamp 0.5s linear infinite;
  }

  @keyframes lamp {
    0% {
      background-image: url("../components/lottery/lamp.png");
    }

    100% {
      background-image: url("../components/lottery/lamp2.png");
    }
  }

</style>
