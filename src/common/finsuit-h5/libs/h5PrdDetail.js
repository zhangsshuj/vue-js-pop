
/**
 * 原型方法：跳转到新手专享产品包装页
 * producdId : 个投id 或 拼团id
 * type ： 可选参数 默认个投 ， alone - 个投  roll - 拼团 
 * data :  附加data,以后根据需求增加字段
 * data.DEFINE_URL : 银行自有包装页面地址，如果有该值直接跳转，否则使用比财包装页
 */

export default function (producdId, type = "alone", data = {}) {
    let types = {
        "alone": "个投",
        "roll": "拼团",
    }
    if (!producdId) {
        this.$Toast(`未配置${types[type]}产品或${types[type]}id不存在`);
        return;
    }
    if (!this.$Config.producdDetailHost) {
        console.error("请在项目配置文件中添加：producdDetailHost服务器地址");
        return;
    }

    const host = this.$Config.producdDetailHost;
    // 检查DEFINE_URL字段 是否是正常的链接地址
    const IS_DEFINE_URL = data.DEFINE_URL && (data.DEFINE_URL + "").indexOf("http") === 0 || (data.DEFINE_URL + "").indexOf("www") === 0;

    let url = "";

    // 拼财app
    if (this.$store.state.APP_FLAG == "PC") {
        if (IS_DEFINE_URL) {
            url = data.DEFINE_URL;
        } else {
            url = host + `/pc/#/personal`;
            url += `?type=${type}`;
            url += `&id=${producdId}`;
            // 原生需要参数 - 帮助中心是否显示
            url += `&helpCenterCode=PC_PRODUCT_PACKAGE_PAGE`;
            // 隐藏包装页的分享图标
            url += `&hideH5Share=true`;
            // 传给包装页的活动code
            url += `&actityCode=${this.$Config.actityCode}`;
            url += `&__with_login__=1&hideRightShare=`;
        }
        console.log("跳转拼财app", url);
        this.$bcBridge.openWebview(url);
        return;
    }
    // 比财app
    if (this.$store.state.APP_FLAG == "BC") {
        if (IS_DEFINE_URL) {
            url = data.DEFINE_URL;
        } else {
            url = host + `/nay/#/personal`;
            url += `?type=${type}`;
            url += `&id=${producdId}`;
            // 原生需要参数 - 帮助中心是否显示
            url += `&helpCenterCode=BC_PRODUCT_PACKAGE_PAGE`;
            // 隐藏包装页的分享图标
            url += `&hideH5Share=true`;
            // 传给包装页的活动code
            url += `&actityCode=${this.$Config.actityCode}`;
            url += `&__with_login__=1&hideRightShare=`;
        }

        console.log("跳转比财app", url);
        this.$bcBridge.openWebview(url);
        return;
    }
    // 小程序环境
    if (this.$store.state.APP_FLAG == "PMP") {
        if (IS_DEFINE_URL) {
            url = data.DEFINE_URL;
        } else {
            url = host + `/mp/#/personal`
            url += `?type=${type}`;
            url += `&id=${producdId}`;
            // 隐藏包装页的分享图标
            url += `&hideH5Share=true`;
            // 传给包装页的活动code
            url += `&actityCode=${this.$Config.actityCode}`;

            url += `&TOKEN=${this.$store.state.TOKEN}`;
            url += `&PMP_FLAG=1`;
            url += `&MEMBER_ID=${this.$store.state.ID}`;
            url += `&SYSTEM_TYPE=${this.$store.state.SYSTEM_TYPE}`;
            url += `&MODEL=${this.$store.state.MODEL}`;
            url += `&OPEN_API_CHANNEL_ID=${this.$store.state.OPEN_API_CHANNEL_ID}`;
        }
        setTimeout(() => {
            window.location.href = url;
        }, 500);
        return;
    } else {
        url = (host + `/mp/#/personal?type=alone&id=${producdId}&TOKEN=${this.$store.state.TOKEN}`);
        setTimeout(() => {
            window.location.href = url;
        }, 500);
    }
}