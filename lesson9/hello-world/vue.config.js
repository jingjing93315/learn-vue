const port = 7070
const path = require('path')


const resolve = dir =>  path.join(__dirname, dir)
// node代码
// 基础配置
 module.exports = {
    publicPath: '/best-practice',
    devServer: {
        port
    },
    // configureWebpack: {
    //     // 加一个别名 @
    //     resolve: {
    //         // dirname 当前目录
    //         alias: {
    //              comps: path.join(__dirname, 'src/components')
    //         }
    //     }
    // }
    configureWebpack: config => {
        // config是直接传入的webpack配置对象
        // 直接对它加工，返回一个也可以
        config.resolve.alias.comps = path.join(__dirname, 'src/components')
        if(process.env.NODE_ENV === 'development'){
            config.name = 'vue项目最佳实践'
        } else {
            config.name = 'vue best practice'
        }
    },
    chainWebpack (config) {
        // 使用icon图标 svg-sprite-loader
        // 1. 排除当前处理svg的规则
        // vue inspect webpack配置项
        config.module.rule('svg')
        .exclude.add(resolve('src/icons'))
        // 2. 添加一个规则，可以打包icons目录中的svg文件
        config.module.rule('icons')
        .test(/\.(svg)(\?.*)?$/)
        .include.add(resolve('src/icons')).end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({symbolId: 'icon-[name]'})
    }
 }