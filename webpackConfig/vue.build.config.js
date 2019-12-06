let util = require('./vue.utils.js')
let path = require('path')
let alis = util.getAlias()
const IS_PROD = ["production", "productionTest", "dev"].includes(process.env.NODE_ENV);
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
const resolve = dir => path.join(__dirname, dir);
//配置pages多页面获取当前文件夹下的html和js
console.log(process.env.NODE_ENV)
let pages = {};
let currBuildPackName = ""

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
console.log(util.getAlias());
module.exports = {
    pages,
    outputDir: `dist/${process.env.NODE_ENV}/${currBuildPackName}`, //标识是打包哪个文件
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
        // 打包分析
        if (IS_PROD) {
            config.plugin("webpack-report").use(BundleAnalyzerPlugin, [
                {
                    analyzerMode: "static"
                }
            ]);
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