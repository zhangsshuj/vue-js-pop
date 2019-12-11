const IS_PROD = ["production", "productionTest", "dev"].includes(process.env.VUE_APP_CONFIG_NODE_ENV);
const CopyWebpackPlugin = require("copy-webpack-plugin"); //COPY
const path = require('path')
const CompressionWebpackPlugin = require("compression-webpack-plugin"); //开启 gzip 压缩
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i; //开启 gzip 压缩
module.exports = {
    publicPath: IS_PROD ? process.env.VUE_APP_PUBLIC_PATH : './', // 官方要求修改路径在这里做更改，默认是根目录下，可以自行配置
    lintOnSave: false, //禁用eslint
    productionSourceMap: !IS_PROD, // 关闭之后不仅能加快生产环境的打包速度，也能避免源码暴露在浏览器端：
    parallel: require('os').cpus().length > 1, // 构建时开启多进程处理 babel 编译
    runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本,设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
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
                }),
                new CopyWebpackPlugin([
                    {
                        from: path.resolve(__dirname, '../static'),
                        to: 'static',
                        ignore: ['.*']
                    }
                ])
            );
            config.performance = {  // 修改性能限制提示
                hints: false,
                maxEntrypointSize: 512000, // 入口点表示特定条目在初始加载时间期间将使用的所有资产。此选项控制webpack何时基于最大入口点大小（字节）发出性能提示。
                maxAssetSize: 512000 // //资产是从webpack发出的任何文件。此选项控制webpack何时基于单个资产大小（以字节为单位）发出性能提示。
            }
        }
        config.externals = { // 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'vuex': 'Vuex',
            'axios': 'axios'
        };
        config.plugins = [...config.plugins, ...pluginsConfig]
    }
}