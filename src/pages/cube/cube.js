import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

/* 安装finsuit插件包 */
import finsuit from "@common/finsuit-h5"
Vue.use(finsuit);

// 安装confirm
import Confirm from "@common/finsuit-components/Confirm"
Vue.use(Confirm);

/* 注册配置文件 */
import config from "./config/config.index.js"
Vue.prototype["$Config"] = config;

/* 创建分享图片 */
import createShareImage from "./utils/createShareImage.js"
Vue.prototype["$createShareImage"] = createShareImage;

Vue.config.productionTip = false

const app = new Vue({
  router,
  store,
  render: h => h(App)
})


/* 挂载app */
app.$bootstrap();

