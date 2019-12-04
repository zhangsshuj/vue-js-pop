
/**
 * vue实例挂载方法
 */

import { Base64 } from "js-base64"

export default function () {

    let App = null;
    let query = this.$utils.getQueryStr();

    /**
     * 活动ID必带参数 获取全局活动ID 储存起来, 注意顺序，先取query在取store,以便更新。
     */
    let actityId = query.ACTITY_ID || this.$store.state.ACTITY_ID;
    if (actityId) this.$store.commit("ACTITY_ID", { ACTITY_ID: actityId });
    // else this.$Toast("未配置活动ID")


    /**
     * 保存来源FROM_APP_FLAG渠道参数
     */
    let fromAppFlag = query.FROM_APP_FLAG || this.$store.state.FROM_APP_FLAG || "BC";
    this.$store.commit("FROM_APP_FLAG", { FROM_APP_FLAG: fromAppFlag });

    /**
     * 站外环境 以及小程序环境挂载实例 ---- 获取用户信息储存到store以及sess中 同步挂载vue根实例。保证vue组件的生命周期与用户信息耦合起来。
     */
    //  如果url中带有用户信息
    if (query.PMP_FLAG) {
        let userInfo = {
            ID: query.MEMBER_ID,
            PHONE_NUM: query.PHONE_NUM,
            TOKEN: query.TOKEN,
            SESSION_ID: query.SESSION_ID,
            DEVICE_ID: query.DEVICE_ID,
            SYSTEM_TYPE: query.SYSTEM_TYPE,
            VERSION: query.VERSION,
            CHANNEL_ID: query.CHANNEL_ID,
            APP_FLAG: query.PMP_FLAG == "1" ? "PMP" : query.PMP_FLAG,
            CHANNEL: query.CHANNEL,
            CT_VER: query.CT_VER,
            MODEL: query.MODEL,
            OPEN_API_CHANNEL_ID: query.OPEN_API_CHANNEL_ID
        }
        this.$store.commit("USER_LOGIN", userInfo);
        App = this.$mount('#app');
        return;
    }

    /**
     * app环境挂载实例 ---- 获取用户信息储存到store以及sess中 同步挂载vue根实例。保证vue组件的生命周期与用户信息耦合起来。
     * query.IS_APP === "1" 是解决app内的ua获取不到导致无法识别PC或BC的问题，通过url增加IS_APP标识，强制使用异步挂载。
     */
    if (this.$bcBridge.APP_FLAG === "PC" || this.$bcBridge.APP_FLAG === "BC" || query.IS_APP === "1") {
        window.loginResult = window.unloginResult = (argument) => {
            console.debug("loginResult方法回调成功！");
            if (App) return;
            const userInfo = JSON.parse(Base64.decode(argument));
            this.$store.commit("USER_LOGIN", userInfo);
            // 解决拼财1.0.8版本webview性能差导致卡退的问题
            setTimeout(() => {
                App = this.$mount('#app');
            }, 1);
        }
        // 主动通知App回调loginResult方法
        this.$bcBridge.sendLoginResult();
        return;
    }


    App = this.$mount('#app');
}