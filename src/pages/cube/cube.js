import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import * as fundebug from "fundebug-javascript";
import fundebugVue from "fundebug-vue";
fundebug.apikey = "ad28d919b07fca6669afbe5f29048ceb583bb013ab32217eb8be7d3ba94214f8"
fundebug.setHttpBody = true;
fundebug.silentVideo = true;
fundebugVue(fundebug, Vue);
// fundebug.test()
require('fundebug-revideo');
require('@assets/iconfont.js')
Vue.config.silent = true
Vue.config.performance = true
Vue.config.keyCodes = {
    v: 86,
    f1: 112,
    // camelCase 不可用
    mediaPlayPause: 13 ,
    // 取而代之的是 kebab-case 且用双引号括起来
    "media-play-pause": 13 ,
    up: [38, 87]
}
Vue.directive('my-directive', {
    bind: function (el,binding) {
      console.log(el)
      console.log(binding)
      console.log('bind')
        // el.style.background = 'red'
    },
    inserted: function (el,binding) {
        console.log(el)
        console.log(binding)
        console.log('inserted')
        el.focus()
        el.style.background = 'red'
    },
    update: function (el,binding) {
        console.log('update')
        console.log(el)
        console.log(binding)
    },
    componentUpdated: function (el,binding) {
        console.log('componentUpdated')
        console.log(el)
        console.log(binding)
    },
    unbind: function (el,binding) {
        console.log('unbind')
        console.log(el)
        console.log(binding)
    }
})
Vue.filter('myFilter', function (value) {
    let value1 = value.slice(1,2)
    return value1
})
/* 安装finsuit插件包 */
import finsuit from "@common/finsuit-h5"
Vue.use(finsuit);

/* 引入 axios */
import axios from "@common/finsuit-http"
Vue.prototype.$axios = axios;

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

// 引入vant
import Vant from 'vant';
import 'vant/lib/index.css';
import { List } from 'vant';
Vue.use(List);
Vue.use(Vant);

/* 创建分享图片 */
import createShareImage from "./utils/createShareImage.js"
Vue.prototype["$createShareImage"] = createShareImage;

import SMEditor from './config/smeditor'
// 全局组件
Vue.use(SMEditor)

Vue.config.productionTip = false

const app = new Vue({
  // el:'#app',
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
  // components: {App},
  // template: `<App/>`,
  render: h => h(App)
})


/* 挂载app */
app.$bootstrap();

