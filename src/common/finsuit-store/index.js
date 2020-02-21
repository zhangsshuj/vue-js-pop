

export const state = {
    ID: localStorage.getItem("ID") || sessionStorage.getItem("ID") || "",                                                   // 用户id
    PHONE_NUM: localStorage.getItem("PHONE_NUM") || sessionStorage.getItem("PHONE_NUM") || "",                              // 用户手机号
    TOKEN: localStorage.getItem("TOKEN") || sessionStorage.getItem("TOKEN") || "",                                          // 用户登录token
    SESSION_ID: localStorage.getItem("SESSION_ID") || sessionStorage.getItem("SESSION_ID") || "",                           // 会话id
    DEVICE_ID: localStorage.getItem("DEVICE_ID") || sessionStorage.getItem("DEVICE_ID") || "",                              // 设备id
    SYSTEM_TYPE: localStorage.getItem("SYSTEM_TYPE") || sessionStorage.getItem("SYSTEM_TYPE") || "",                        // 手机类型 ios || android
    VERSION: localStorage.getItem("VERSION") || sessionStorage.getItem("VERSION") || "",                                    // 设备版本号
    CHANNEL_ID: localStorage.getItem("CHANNEL_ID") || sessionStorage.getItem("CHANNEL_ID") || "",                           // 渠道ID
    APP_FLAG: localStorage.getItem("APP_FLAG") || sessionStorage.getItem("APP_FLAG") || "",                                 // PC(拼财) || BC(比财) || PMP(小程序)
    CHANNEL: localStorage.getItem("CHANNEL") || sessionStorage.getItem("CHANNEL") || "",                                    // 未知
    CT_VER: localStorage.getItem("CT_VER") || sessionStorage.getItem("CT_VER") || "",                                       // 未知
    MODEL: localStorage.getItem("MODEL") || sessionStorage.getItem("MODEL") || "",                                          // 未知
    OPEN_API_CHANNEL_ID: localStorage.getItem("OPEN_API_CHANNEL_ID") || sessionStorage.getItem("OPEN_API_CHANNEL_ID") || "", // 未知 实名认证需要

    // 站外APP_FLAG
    FROM_APP_FLAG: localStorage.getItem("FROM_APP_FLAG") || sessionStorage.getItem("FROM_APP_FLAG") || "",                  // 来源FROM_APP_FLAG适用站外适用  PC(拼财) || BC(比财) || PMP(小程序)

    ACTITY_ID: localStorage.getItem("ACTITY_ID") || sessionStorage.getItem("ACTITY_ID") || "",
}

export const getters = {
    isLogin: state => {
        if (state.TOKEN) return true;
        else return false;
    }
}


export const mutations = {
    ["USER_LOGIN"] (state, userInfo) {
        console.debug("👧👧👧👧👧👧👧👧👧👧👧👧👧👧👧👧👧", userInfo);
        for (const key in userInfo) {
            const element = userInfo[key];
            // 兼容值为 0 的情况
            if (element || element == 0) {
                state[key] = element || "";
                localStorage.setItem(key, String(element || ""));
            }
        }
    },


    ["FROM_APP_FLAG"] (state, params) {
        state.FROM_APP_FLAG = params.FROM_APP_FLAG || "";
        localStorage.setItem("FROM_APP_FLAG", String(params.FROM_APP_FLAG || ""));
    },


    ["ACTITY_ID"] (state, params) {
        state.ACTITY_ID = params.ACTITY_ID || "";
        localStorage.setItem("ACTITY_ID", String(params.ACTITY_ID || ""));
    },

}
