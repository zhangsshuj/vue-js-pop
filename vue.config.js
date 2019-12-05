let config = require(`./webpackConfig/vue.${process.env.NODE_ENV}.config.js`)
let publicConfig = require(`./webpackConfig/vue.public.config.js`)
console.log({...config,...publicConfig})
module.exports = {...config,...publicConfig}