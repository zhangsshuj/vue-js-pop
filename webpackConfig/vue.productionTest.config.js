let util = require('./vue.utils.js')
let path = require('path')
const IS_PROD = ["production", "productionTest", "dev"].includes(process.env.NODE_ENV);
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
//配置pages多页面获取当前文件夹下的html和js
console.log(process.env.NODE_ENV)
let pages = {}
let currBuildPackName = ''

const entries = util.getOutPut('./src/pages/**?/*.js');
currBuildPackName = JSON.parse(process.env.npm_config_argv).remain[0];
console.log("当前包命令：", currBuildPackName);
if (!currBuildPackName) {
    throw new Error("请指定打包的项目名称 例如：npm run build name");
}
pages[currBuildPackName] = entries[currBuildPackName];
console.log("当前包——入口js：", pages);
if (!pages[currBuildPackName]) {
    throw new Error(`没有找到【${currBuildPackName}】项目 请检查项目名称是否正确`);
}
const currHtmlPluginPath = util.htmlPluginPath(currBuildPackName);
console.log("当前包——入口html：", currHtmlPluginPath);
const publicPath = `./`;
console.log("当前包——服务器发布目录：", publicPath);
//配置end

module.exports = {
    outputDir: 'dist/productionTest/'+ currBuildPackName, //标识是打包哪个文件
    pages,
    chainWebpack: config => {
        // 打包分析
        if (IS_PROD) {
            config.plugin("webpack-report").use(BundleAnalyzerPlugin, [
                {
                    analyzerMode: "static"
                }
            ]);
        }
        const cdn = { // 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖
            js: [
                "//finsuit.bicai365.com/fhc/vue/2.6.10/vue.min.js", // 访问https://unpkg.com/vue/dist/vue.min.js获取最新版本
                "//finsuit.bicai365.com/fhc/vue-router/3.1.2/vue-router.min.js",
                "//finsuit.bicai365.com/fhc/vuex/3.1.1/vuex.min.js",
                "//finsuit.bicai365.com/fhc/axios/0.18.1/axios.min.js"
            ]
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