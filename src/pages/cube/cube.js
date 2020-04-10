import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
require('@assets/iconfont.js')
Vue.config.silent = true

/* 安装finsuit插件包 */
import finsuit from "@common/finsuit-h5"
Vue.use(finsuit);

import localStore from "./utils/localStore.js"
import storageCross from "./utils/storageCross.js"
Vue.prototype["$localStore"] = localStore;
Vue.prototype["$storageCross"] = storageCross;

// 安装v-wxBlur
import wxBlur from "@common/finsuit-h5/libs/directives"
Vue.use(wxBlur)

// 安装confirm
import Confirm from "@common/finsuit-components/Confirm"
Vue.use(Confirm);

/* 注册配置文件 */
import config from "./config/config.index.js"
Vue.prototype["$Config"] = config;

/* 创建分享图片 */
import createShareImage from "./utils/createShareImage.js"
Vue.prototype["$createShareImage"] = createShareImage;

import SMEditor from './config/smeditor'
// 全局组件
Vue.use(SMEditor)

Vue.config.productionTip = false

const app = new Vue({
  router,
  store,
  data:{
    foo:1122
  },
  methods: {
    dosome() {
      alert('1')
    }
  },
  render: h => h(App)
})


/* 挂载app */
app.$bootstrap();

