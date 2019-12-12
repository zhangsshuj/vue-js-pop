<template>
  <div class="about">
    <ScrollFixedEnd @scrollEnd="isHidden = false" @scroll="isHidden= true">
      <div id="imgShare">
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
          <img :src="canvasSrc" style="margin:auto">
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
  export default {
      components: {btn,EllipsisText,EmptyData,MaskBox,Popup,Scroll,ScrollFixedEnd},
      data() {
          return {
            isEmptyData: false,
            isMaskBox: false,
            isPopup: false,
            isScroll: false,
            isHidden: false,
            qrcodeSrc: "", //二维码地址
            canvasSrc: "", //二维码地址
          }
      },
      mounted() {
          this.$nextTick(() => {
              this.init();
          });
      },
      methods: {
          init() {
              this.generateQRCode()
          },
          shareFn() {
              this.$createShareImage((cb) => {
                  console.log(cb)
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
              html2canvas(document.getElementById("imgShare"), {
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

</style>
