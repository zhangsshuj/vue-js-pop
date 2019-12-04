let utils = require('./vue.utils.js')
module.exports = {
    css: {
        loaderOptions: {
            postcss: {
                plugins: [require('postcss-px2rem')({
                    remUnit: 75
                })]
            }
        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                '@': '@/src',
                '@src': '@/src',
                '@common': '@/src/common',
                // '@src': resolve('src/pages/onTopic'),
                '@css': '@/src/assets/css',
                ...utils.getAlias()
            }
        }
    },
}