const processEnv = process.env.NODE_ENV == 'development' ? 'development' : 'build'
const config = require(`./webpackConfig/vue.${processEnv}.config.js`)
const publicConfig = require(`./webpackConfig/vue.public.config.js`)
console.log({...config,...publicConfig})
module.exports = {...config,...publicConfig}