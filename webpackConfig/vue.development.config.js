let path = require('path')
let util = require('./vue.utils.js')
//配置pages多页面获取当前文件夹下的html和js
console.log(process.env.NODE_ENV)

let cooked = JSON.parse(process.env.npm_config_argv).cooked;
cooked = cooked.slice(2);
let pages = {}
pages = util.getEntry('./src/pages/**?/*.html',cooked);

console.log(`您正在启动${process.env.NODE_ENV}环境,启动的项目包括[${JSON.stringify(Object.keys(pages))}]`,)


//配置end

module.exports = {
    lintOnSave: false, //禁用eslint
    // baseUrl:process.env.NODE_ENV === "production"?'https://www.mycdn.com/':'/',
    productionSourceMap: false, // 关闭之后不仅能加快生产环境的打包速度，也能避免源码暴露在浏览器端：
    pages,
    devServer: {
        index: path.join('/', `${util.getDevPackName(cooked)}.html`), // 启动所有默认打开template.html
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