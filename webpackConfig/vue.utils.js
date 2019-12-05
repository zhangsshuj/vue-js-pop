let glob = require('glob')
let path = require('path')
const PAGE_PATH = path.resolve(__dirname, '../src/pages')
const util = {
    // dev 启动入口配置
    getEntry: function (globPath,cooked) {
        let entries = {},
            basename, tmp, pathname, appname;

        glob.sync(globPath).forEach(function(entry) {
            basename = path.basename(entry, path.extname(entry));
            // console.log(entry)
            tmp = entry.split('/').splice(-3);
            pathname = basename; // 正确输出js和html的路径

            // console.log(pathname)
            entries[pathname] = {
                entry: 'src/' + tmp[0] + '/' + tmp[1] + '/' + tmp[1] + '.js',
                template: 'src/' + tmp[0] + '/' + tmp[1] + '/' + tmp[2],
                title:  tmp[2],
                filename: tmp[2]
            };
        });
        if (cooked.length > 0) {
            let newEntrys = {};
            for (let index = 0; index < cooked.length; index++) {
                const devPackName = cooked[index].replace(/-/, "");
                newEntrys[devPackName] = entries[devPackName];
            }
            entries = newEntrys;
        }
        return entries;
    },
    // build  入口和输出配置
    getOutPut: function(globPath) {
        let entries = {},
            basename, tmp, pathname, appname;

        glob.sync(globPath).forEach(function(entry) {
            basename = path.basename(entry, path.extname(entry));
            // console.log(entry)
            tmp = entry.split('/').splice(-3);
            pathname = basename; // 正确输出js和html的路径

            // console.log(pathname)
            entries[pathname] = {
                entry: 'src/' + tmp[0] + '/' + tmp[1] + '/' + tmp[1] + '.js', // page 的入口
                template: 'src/' + tmp[0] + '/' + tmp[1] + '/' + tmp[1] + '.html', // 模板来源
                filename: 'index.html', // 在 dist/index.html 的输出
                // 在这个页面中包含的块，默认情况下会包含,提取出来的通用 chunk 和 vendor chunk。
                // chunks: ['chunk-vendors', 'chunk-common', 'index']
            };
        });
        return entries;
    },
    // 获取打包路径
    htmlPluginPath:function(currBuildPackName) {
        const entryHtml = glob.sync(PAGE_PATH + '/*/*.html')
        console.log('entryHtml:')
        console.log(entryHtml)
        const reg = new RegExp(`/${currBuildPackName}/`);
        let resPath = "";
        entryHtml.forEach((filePath) => {
            if (reg.test(filePath)) resPath = filePath;
        })
        return resPath;
    },
    // 获取dev启动的参数
    getDevPackName:function (cooked) {
        if (cooked && cooked.length > 0) {
            return cooked[0].replace(/-/,"")
        } else {
            return 'template'
        }
    },
    // 设置alis
    getAlias: function () {
        const alias = {};
        const dirs = glob.sync(PAGE_PATH + '/*')
        dirs.forEach((dirPath) => {
            const dirname = dirPath.substring(dirPath.lastIndexOf('/') + 1);
            alias["@" + dirname] = path.join(__dirname, '..', "src/pages/" + dirname)
        })
        return alias;
    }
}
module.exports = util