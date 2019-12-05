let utils = require('./vue.utils.js')
let path = require('path')
const IS_PROD = ["production", "productionTest", "dev"].includes(process.env.NODE_ENV);
const CompressionWebpackPlugin = require("compression-webpack-plugin"); //开启 gzip 压缩
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i; //开启 gzip 压缩
module.exports = {
    publicPath: IS_PROD ? process.env.VUE_APP_PUBLIC_PATH : './', // 官方要求修改路径在这里做更改，默认是根目录下，可以自行配置
    lintOnSave: false, //禁用eslint
    productionSourceMap: !IS_PROD, // 关闭之后不仅能加快生产环境的打包速度，也能避免源码暴露在浏览器端：
    parallel: require('os').cpus().length > 1, // 构建时开启多进程处理 babel 编译
    runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
    css: {
        extract: IS_PROD,
        sourceMap: false,
        loaderOptions: {
            postcss: {
                plugins: [require('postcss-px2rem')({
                    remUnit: 75
                })]
            },
            sass: {
                prependData: `@import "@/assets/formatPx.scss";`
            }
        }
    },
    configureWebpack: config => {
        const pluginsConfig = [];
        if (IS_PROD) {
            pluginsConfig.push( //开启 gzip 压缩
                new CompressionWebpackPlugin({
                    filename: "[path].gz[query]",
                    algorithm: "gzip",
                    test: productionGzipExtensions,
                    threshold: 10240,
                    minRatio: 0.8
                })
            );
            // config.externals = { // 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖
            //     'vue': 'Vue',
            //     'vue-router': 'VueRouter',
            //     'vuex': 'Vuex',
            //     'axios': 'axios'
            // };
        }
        config.plugins = [...config.plugins, ...pluginsConfig];
        // resolve: {
        //     alias: {
        //         'vue$': 'vue/dist/vue.esm.js',
        //         '@': '@/',
        //         '@src': '@/',
        //         '@common': '@/common',
        //         '@css': '@/assets/css'
        //         // ...utils.getAlias()
        //     }
        // }
    }
}