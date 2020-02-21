import jsStorage from "js-storage"
// 列表已读记录
export const h5Storage = jsStorage.initNamespaceStorage('@cubeUI').localStorage;
/**
 * 封装原生和H5本地储存方法
 * @param {*} type
 * @param {*} data
 * @param {*} callBack
 */
// this.$AppLocalStore("set", {});
// this.$AppLocalStore("get", {}, () => { });

export default function (type = "get", key = '', data = {}, callBack = () => { }) {

    const setStore = (dataset,key) => {
        // 如果拼财1.0.8版本
        if (this.$store.state.APP_FLAG === "PC" && this.$utils.isVersion(this.$store.state.VERSION, "1.2.0")) {
            this.$bcBridge.storeFlag(dataset);
        } else if (this.$store.state.APP_FLAG === "BC" && this.$utils.isVersion(this.$store.state.VERSION, "3.2.0")) {
            this.$bcBridge.storeFlag(dataset);
        } else {
            h5Storage.set(key, JSON.stringify(dataset));
        }
    }
    const getStore = (dataset,key) => {
        if (this.$store.state.APP_FLAG === "PC" && this.$utils.isVersion(this.$store.state.VERSION, "1.2.0")) {
            this.$bcBridge.sendFlagValue(dataset, callBack);
        } else if (this.$store.state.APP_FLAG === "BC" && this.$utils.isVersion(this.$store.state.VERSION, "3.2.0")) {
            this.$bcBridge.sendFlagValue(dataset, callBack);
        } else {
            let res = h5Storage.get(key) || "{}";
            callBack(JSON.parse(res));
        }
    }

    switch (type) {
        case "set":
            setStore(data,key);
            break;
        case "get":
            getStore(data,key);
            break;
        default:
            console.error("未知type类型");
            break;
    }



}
