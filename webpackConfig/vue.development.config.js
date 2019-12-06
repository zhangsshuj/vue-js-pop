let path = require('path')
let util = require('./vue.utils.js')
let alis = util.getAlias()
const resolve = dir => path.join(__dirname, dir);
//配置pages多页面获取当前文件夹下的html和js

let cooked = JSON.parse(process.env.npm_config_argv).cooked;
cooked = cooked.slice(2);
let pages = {}
pages = util.getEntry('./src/pages/**?/*.html',cooked);

console.log(`您正在启动${process.env.NODE_ENV}环境,启动的项目包括[${JSON.stringify(Object.keys(pages))}]`,)


//配置end

module.exports = {
    pages,
    devServer: {
        overlay: { // 让浏览器 overlay 同时显示警告和错误
            warnings: true
        },
        index: path.join('/', `${util.getDevPackName(cooked)}.html`), // 启动所有默认打开template.html
        open: true, // 是否打开浏览器
        host: '0.0.0.0',
        port: 8088,
        https: false,
        hotOnly: true,// 热更新
        proxy: {
            "/api": {
                target:
                    "https://www.easy-mock.com/mock/5bc75b55dc36971c160cad1b/sheets", // 目标代理接口地址
                secure: false,
                changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
                // ws: true, // 是否启用websockets
                pathRewrite: {
                    "^/api": "/"
                }
            }
        }, // 设置代理
        before: app => {}
    },
    chainWebpack: config => {
        config.resolve.alias
            .set("vue$", "vue/dist/vue.esm.js")
            .set("@", resolve(`../src`))
            .set("@src", resolve(`../src`))
            .set("@assets", resolve(`../src/assets`))
            .set("@css", resolve(`../src/assets/css`))
            .set("@common", resolve(`../src/common`));
        for(key in alis) {
            config.resolve.alias
                .set(key, alis[key])
        }
        config.module
            .rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => {
                // 修改它的选项...
                options.limit = 100
                return options
            })
        Object.keys(pages).forEach(entryName => {
            config.plugins.delete(`prefetch-${entryName}`);
        });
        if(process.env.NODE_ENV === "production") {
            config.plugin("extract-css").tap(() => [{
                path: path.join(__dirname, "./dist"),
                filename: "css/[name].[contenthash:8].css"
            }]);
        }
    }
}