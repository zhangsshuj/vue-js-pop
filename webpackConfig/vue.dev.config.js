let path = require('path')
let util = require('./vue.utils.js')
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
    publicPath: './', // 官方要求修改路径在这里做更改，默认是根目录下，可以自行配置
    outputDir: 'dist/dev/'+ currBuildPackName, //标识是打包哪个文件
    lintOnSave: false, //禁用eslint
    // baseUrl:process.env.NODE_ENV === "production"?'https://www.mycdn.com/':'/',
    productionSourceMap: false, // 关闭之后不仅能加快生产环境的打包速度，也能避免源码暴露在浏览器端：
    pages,
    devServer: {
        open: true,
        host: '0.0.0.0',
        port: 8088,
        https: false,
        hotOnly: false,
        proxy: {
            '/xrf/': {
                target: 'http://reg.tool.hexun.com/',
                changeOrigin: true,
                pathRewrite: {
                    '^/xrf': ''
                }
            },
            '/wa/': {
                target: 'http://api.match.hexun.com/',
                changeOrigin: true,
                pathRewrite: {
                    '^/wa': ''
                }
            }
        }, // 设置代理
        before: app => {}
    },
    chainWebpack: config => {
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