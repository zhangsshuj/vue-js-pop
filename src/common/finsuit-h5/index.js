

import "@common/finsuit-assets/less/common.less"
import "@common/finsuit-assets/less/animate.less"
import "@common/finsuit-assets/icomoon/style.css"

import "./libs/flexible.js"
import "./libs/fastclick.js"
import "./libs/appEventCallBack.js"

import px2rem from "./libs/px2rem.js"
import Toast from "./libs/toast.js"
import Loading from "./libs/loading.js"
import bcBridge from "./libs/bcBridge.js"
import utils from "./libs/utils.js"
import modalHelper from "./libs/modalHelper.js"
import login from "./libs/login.js"
import browser from "./libs/browser.js"
import downloadApp from "./libs/downloadApp.js"
import transfromAliyunUrl from "./libs/transfromAliyunUrl.js"
import h5RealNameAuth from "./libs/h5RealNameAuth.js"
import h5PrdDetail from "./libs/h5PrdDetail.js"
import formChecker from "./libs/formChecker.js"
import bus from "./libs/bus.js"


import bootstrap from "./libs/bootstrap.js"

import confirm from "@common/finsuit-components/Confirm/index.js"
import throwNewPage from "@common/finsuit-components/ThrowNewPage/index.js"

import filters from "./libs/filters.js"
import directives from "./libs/directives.js"


const finsuit = function (Vue, options = {}) {

    Vue.prototype["$px2rem"] = px2rem;
    Vue.prototype["$Toast"] = Toast;
    Vue.prototype["$Loading"] = Loading;
    Vue.prototype["$bcBridge"] = bcBridge;
    Vue.prototype["$utils"] = utils;
    Vue.prototype["$modalHelper"] = modalHelper;
    Vue.prototype["$sendLoginResult"] = login.sendLoginResult;
    Vue.prototype["$login"] = login.login;
    Vue.prototype["$checkLogin"] = login.checkLogin;
    Vue.prototype["$browser"] = browser;
    Vue.prototype["$downloadApp"] = downloadApp;
    Vue.prototype["$transfromAliyunUrl"] = transfromAliyunUrl;
    Vue.prototype["$h5RealNameAuth"] = h5RealNameAuth;
    Vue.prototype["$h5PrdDetail"] = h5PrdDetail;
    Vue.prototype["$formChecker"] = formChecker;
    Vue.prototype["$bus"] = bus;

    Vue.prototype["$throwNewPage"] = throwNewPage;

    Vue.use(confirm);
    Vue.use(filters);
    Vue.use(directives);

    Vue.prototype["$bootstrap"] = bootstrap;

    if (process.env.VUE_APP_CONFIG_NODE_ENV !== 'production') {
        let Vconsole = require("vconsole");
        const vConsole = new Vconsole();
        Vue.use(vConsole)
    }

}


export default {
    install: finsuit
}