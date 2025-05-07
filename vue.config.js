const path = require("path");

module.exports = {
    publicPath: "", // 部署应用时的根路径(默认'/'),也可用相对路径(存在使用限制)
    outputDir: "dist", // 运行时生成的生产环境构建文件的目录(默认''dist''，构建之前会被清除)
    assetsDir: "static", // 放置生成的静态资源(s、css、img、fonts)的(相对于 outputDir 的)目录(默认'')
    indexPath: "index.html", // 指定生成的 index.html 的输出路径(相对于 outputDir)也可以是一个绝对路径。
    lintOnSave: false, // true,表示检测语法，false 表示关闭语法检测规则
    productionSourceMap: false, // 是否在保存的时候检查
    devServer: {
        open: true,
        host: "0.0.0.0",
        hotOnly: false,
    },
    configureWebpack: (config) => {
        // 配置别名
        Object.assign(config.resolve, {
            alias: {
                "@": path.resolve("src"),
            },
        });
    },
    chainWebpack: (config) => {
        config.module
            .rule("vue")
            .use("vue-loader")
            .tap((options) => {
                options.compiler = require("vue-template-babel-compiler");
                return options;
            });
    },
};
