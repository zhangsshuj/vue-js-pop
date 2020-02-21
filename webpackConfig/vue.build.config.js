let util = require('./vue.utils.js')
let path = require('path')
let alis = util.getAlias()
const IS_PROD = ["production", "productionTest", "dev"].includes(process.env.VUE_APP_CONFIG_NODE_ENV);
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
const resolve = dir => path.join(__dirname, dir);
//配置pages多页面获取当前文件夹下的html和js
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
module.exports = {
    pages,
    assetsDir: 'static', // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    outputDir: `dist/${process.env.VUE_APP_CONFIG_NODE_ENV}/${currBuildPackName}`, //标识是打包哪个文件
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
            // 删除预加载
            // config.plugins.delete('preload');
            // config.plugins.delete('prefetch');
            // 压缩代码
            // config.optimization.minimize(false);
            // 分割代码 防止重复
            // config.optimization.splitChunks({
            //     chunks: 'all'
            // })
        }
        config.module
            .rule('images')
            .test(/\.(png|jpe?g|gif|svg|mp4|webm|ogg|mp3|wav|flac|aac|woff2?|eot|ttf|otf)(\?.*)?$/)
            .use('url-loader')
            // .loader('url-loader')
            .tap(options => {
                options.limit = 10000
                // options.name = path.posix.join('static', 'img/[name].[hash:7].[ext]')
                return options
            })
        Object.keys(pages).forEach(entryName => {
            config.plugins.delete(`prefetch-${entryName}`);
        });
        // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中
        // if(process.env.VUE_APP_CONFIG_NODE_ENV === "production" || process.env.VUE_APP_CONFIG_NODE_ENV === "productionTest") {
        //     config.plugin("extract-css").tap(() => [{
        //         path: path.join(__dirname, "./dist"),
        //         filename: "css/[name].[contenthash:8].css"
        //     }]);
        // }
    }
}