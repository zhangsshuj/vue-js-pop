import bus from "./bus.js"

/**
 * webview返回时触发
 */
window.pageAppear = () => {
    bus.$emit("pageAppear");
}