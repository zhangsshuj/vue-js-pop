import axios from "axios"
import Toast from '@common/finsuit-components/Toast'
import browser from "@common/finsuit-h5/libs/browser.js"
import * as store from "@common/finsuit-store/index.js"

const axiosFinsuit = axios.create();
const axiosPoint = axios.create();
/**
 * 版本注意问题：
 * 1、当前使用axios@0.18.0版本.
 * 2、目前最新版本axios@0.19.0不支持自定义配置参数，会导致isLoading和isGetCode无效,获取不到。
 */

//全局请求拦截器
axiosFinsuit.interceptors.request.use(function (config) {

    if (config.isLoading) {
        // 显示loading...
    }

    return config;
}, function (error) {
    return Promise.reject(error);
})

//全局响应拦截器
axiosFinsuit.interceptors.response.use(function (response) {
    let config = response.config;

    // 关闭loading...
    //如果HTTP状态码不正常直接return reject错误
    if (!(response.status === 200 || response.status === 201)) {
        Toast("HTTP状态码：" + response.status + "异常");
        return Promise.reject(new Error("HTTP状态码：" + response.status + "异常"));
    }

    const responseData = response.data;

    if (config.urlTypeDesc && config.urlType) {
        console.debug(`🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎\n`, `接口描述【${config.urlTypeDesc}】\n`, `接口类型【${config.urlType}】\n`, responseData);
    }


    if (Object.prototype.toString.call(responseData) !== "[object Object]") {
        Toast("response data not object");
        return Promise.reject(new Error("response data not object"));
    }

    // 页面需要responseData全部数据
    if (config.isGetCode) {
        return responseData;
    }

    // 页面只需要responseData.data数据
    if (responseData.head.CODE == "0") {
        return responseData.data || {};
    }

    // 如果不responseData.head.CODE 不是0的情况，提示具体错误信息
    Toast({
        message: `${responseData.head.MSG || "系统未知异常"}`,
        iconClass: "icon-tip"
    });

    return Promise.reject(new Error(responseData.head.MSG));

}, function (error) {
    // 关闭loading...
    if (error && error.response) {
        switch (error.response.status) {
            case 400:
                error.message = "请求错误";
                break;

            case 401:
                error.message = "未授权，请登录";
                break;

            case 403:
                error.message = "拒绝访问";
                break;

            case 404:
                error.message = "请求错误，未找到该资源";
                break;

            case 408:
                error.message = "请求超时";
                break;

            case 500:
                error.message = "服务器内部错误";
                break;

            case 501:
                error.message = "服务未实现";
                break;

            case 502:
                error.message = "网关错误";
                break;

            case 503:
                error.message = "服务不可用";
                break;

            case 504:
                error.message = "网关超时";
                break;

            case 505:
                error.message = "HTTP版本不受支持";
                break;

            default:
        }
        error.code = error.response.status;

    } else if (error.code == "ECONNABORTED") {
        error.code = 601;
        error.message = '请求超时,请重试';

    } else if (error.code == undefined) {
        error.code = 602;
        error.message = "网络异常";
        Toast({ message: error.message });
        return Promise.reject(error);

    } else {
        error.code = 603;
        error.message = "未知错误";
    }

    // router.push(`/error?statusCode=${error.code}&msg=${error.message}`);
    Toast({ message: error.message, iconClass: "icon-tip" });
    return Promise.reject(error);
})

export default {

    post: function (baseURL, url, urlType, paramData = {}, paramHead = {}, isLoading = false, isGetCode = false, urlTypeDesc = "") {
        const param_key = {};
        // 公共域参数
        param_key["head"] = {
            TYPE: urlType,
            TOKEN: store.state.TOKEN || "",
            SESSION_ID: store.state.SESSION_ID || "",
            DEVICE_ID: store.state.DEVICE_ID || "",
            SYSTEM_TYPE: store.state.SYSTEM_TYPE || browser.OS,
            APP_FLAG: store.state.APP_FLAG || store.state.FROM_APP_FLAG || "BC",
            VERSION: store.state.VERSION || "",
            ...paramHead
        }
        // 私有域参数
        param_key["param"] = {
            ...paramData
        };
        const data = "param_key=" + JSON.stringify(param_key);
        return axiosFinsuit({
            method: "post",
            url: url,
            baseURL: baseURL,
            data: data,
            timeout: 20000,
            isLoading,
            isGetCode,
            urlType: urlType,
            urlTypeDesc: urlTypeDesc,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
        })
    },

    postPoint: function (baseURL, url, params = {}) {
        const param_key = {};
        // 公共域参数
        param_key["head"] = {
            TYPE: "BATCH_RECORD_FUNCTION_LOG_INFO",
            TOKEN: store.state.TOKEN || "",
            SESSION_ID: store.state.SESSION_ID || "",
            DEVICE_ID: store.state.DEVICE_ID || "",
            SYSTEM_TYPE: store.state.SYSTEM_TYPE || browser.OS,
            APP_FLAG: store.state.APP_FLAG || store.state.FROM_APP_FLAG || "BC",
            VERSION: store.state.VERSION || ""
        };
        // 私有域参数
        param_key["param"] = {
            FUNCTION_LOG_LIST: [{
                FROM_ID: store.state.ACTITY_ID,          // 获取活动id
                APP_PLACE: 98,                                         // 日志位置
                FROM_TYPE: 15,                                         // 日志分类
                NETWORK_TYPE: 2,                                       // 网络类型 1:数据流量  2: WIFI
                SOURCE_ID: 1,                                          // 渠道来源标识
                CREATE_TIME: Date.now(),                               // 创建时间戳，精确到毫秒的时间戳
                // SOURCE_URL: encodeURIComponent(window.location.href),  // 链接地址URL 对于H5活动，填当前页URL
                ITEM_VALUE: "",                                        // 记录值
                ITEM_VALUE1: "",                                       // 记录值1 对于H5外部页面：浏览器类型
                ITEM_VALUE2: "",                                       // 记录值
                APP_MARKET_CODE: "h5",                                 //
                MEMBER_ID: store.state.ID || "",         // 会员ID 如果已经登录需要传
                FROM_PR1: "",                                          // 附加来源信息
                // FROM_PR2: paramData.MODEL || "",                       // 附加来源信息
                ...params,
            }]
        };
        const data = "param_key=" + JSON.stringify(param_key)
        return axiosPoint({
            method: "post",
            url: url,
            baseURL: baseURL,
            data: data,
            timeout: 20000,
            isLoading: false,
            isGetCode: false,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
        })
    },

    get: function (baseURL, url, params, loading, isCode) {
        let isLoading = loading || false;
        let isGetCode = isCode || false;
        return axios({
            method: "GET",
            url: url,
            baseURL: baseURL,
            params: params,
            timeout: 20000,
            isLoading,
            isGetCode,
            headers: {
                'Cache-Control': 'no-cache',
            }
        })
    }
}
