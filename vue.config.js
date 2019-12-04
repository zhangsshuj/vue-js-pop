let config = require(`./webpackConfig/vue.${process.env.NODE_ENV}.config.js`)
let loader = require(`./webpackConfig/vue.loader.js`)
module.exports = {...config,...loader}