const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  // 默认静态资源路径 (可添加相对路径) 需要区分 生产环境 和 开发环境
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  // build的输出目录 默认为'dist'
  outputDir: "dist",
  // 放置静态资源的目录
  assetsDir: "static",
  // 是否每次保存进行代码检测
  // lintOnSave: process.env.NODE_ENV === "development",

  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  devServer: {
    open: true, // 启动后自动打开默认浏览器
    host: "localhost", // 启动时使用的域名
    port: 8080, // 指定端口号
  },
  configureWebpack: () => {
    const resolve = {
      extensions: [".js", ".vue", ".json"],
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    };
    if (process.env.NODE_ENV === "production") {
      return {
        resolve,
        plugins: [
          new CompressionPlugin({
            test: /\.js$|\.html$|\.css$|\.jpg$|\.jpeg$|\.png/, // 需要压缩的文件类型
            threshold: 10240, // 归档需要进行压缩的文件大小最小值，我这个是10K以上的进行压缩
            deleteOriginalAssets: false, // 是否删除原文件
            minRatio: 0.8,
          }),
        ],
      };
    } else {
      return {
        resolve,
      };
    }
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "./src/common/style/common.less")],
    },
  },
};
