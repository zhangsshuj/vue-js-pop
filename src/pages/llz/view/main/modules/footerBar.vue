<template>
  <section class="module-footerBar">
    <a @click="showAlert" class="btn">立即邀请赚钱</a>
  </section>
</template>

<script>
import { mapState } from "vuex"
export default {
  components: {},
  data () {
    return {
      // 版本开关 1.0.8 版本的拼财不支持该方法 h5Certify()   (v1 < v2) 
      vFlag: this.$utils.isVersion("1.0.8", this.$store.state.VERSION),
      pageLoading: this.$Loading(),
    }
  },
  computed: {
    ...mapState({
      JSON_CONDITIONS: state => state.main.JSON_CONDITIONS
    })
  },
  mounted () {

  },

  methods: {
    showAlert () {
      this.$trackEvents.ACB0K006();
      if (this.JSON_CONDITIONS == 0) {
        let dialogComponent = this.$CommonDialog({
          componentName: "EmotionalHint",
          appendElement: document.getElementById("page"),
          title: "友情提示",
          content: "本活动需要先实名认证才能参与哦",
          btn: "去实名",
          btnCallback: () => {
            this.$trackEvents.ACB0K020();
            //   去实名
            this.toAuthPage();
          }
        })
      } else if (this.$store.state.APP_FLAG == "PMP") {
        if (this.pageLoading.isShow) {
          return;
        }
        this.pageLoading.show(false, 0);
        this.$createShareImage((baseimg64) => {
          //   let url = "";
          //   url = window.location.href.split("#")[0];
          //   url += `#/mpmscanInvite`;
          //   url += `?ACTITY_ID=${this.$store.state.ACTITY_ID}`;
          //   url += `&baseimg64=${baseimg64}`;
          this.pageLoading.close()
          this.$router.push({
            path: '/mpmscanInvite',
            query: {
              ACTITY_ID: this.$store.state.ACTITY_ID,
              baseimg64: baseimg64
            }
          })
          //   this.$bcBridge.openWebview(url)
        })
      } else if (this.JSON_CONDITIONS == 1) {
        this.$emit('shareBtnCallBack')
      }
    },
    // 去认证
    toAuthPage () {
      //   this.$trackEvents.ACB0Q003({ ITEM_VALUE: "去认证", ITEM_VALUE1: this.taskData.taskId });
      // APP实名认证跳原生 接受回调函数
      if ((this.$store.state.APP_FLAG === "PC" && this.vFlag === false) || this.$store.state.APP_FLAG === "BC") {
        this.$bcBridge.h5Certify({
          success: (v) => { },
          fail: () => { this.$Toast("认证失败,请重试") },
        });
      }
      //  拼财app版本1.0.8版本跳转h5实名认证
      else if (this.$store.state.APP_FLAG === "PC" && this.vFlag === true) {
        // let url = this.$Config.h5Host + this.$Config.h5ServerPath + "/#/";
        this.$h5RealNameAuth();
      }
      // 小程序实名认证跳H5认证页，认证成功回调地址
      else {
        // let url = this.$Config.h5Host + this.$Config.h5ServerPath + "/#/";
        this.$h5RealNameAuth();
      }

    },
  }
}
</script>

<style lang="less" scoped>
.module-footerBar {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 10;
  padding: 20px;
  background: #fff;
  width: 100%;
  .btn {
    display: block;
    width: 570px;
    height: 84px;
    line-height: 84px;
    margin: 0 auto;
    border-radius: 500px;
    background-image: -webkit-linear-gradient(
      bottom,
      #fda431,
      #febb53,
      //   #fda431
    );
    text-align: center;
    color: #fff;
    font-size: 28px;
    font-weight: bold;
  }
}
</style>
