const processEnv = process.env.VUE_APP_CONFIG_NODE_ENV == 'development' ? 'development' : 'build'
const config = require(`./webpackConfig/vue.${processEnv}.config.js`)
const publicConfig = require(`./webpackConfig/vue.public.config.js`)
module.exports = {...config,...publicConfig}