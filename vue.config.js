const path = require('path');
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin');

module.exports = {
  publicPath: '/',
  configureWebpack: {  //骨架屏配置
    plugins: [
      new SkeletonWebpackPlugin({
        webpackConfig: {
          entry: {
            app: path.join(__dirname, './src/skeleton.js'),
          },
        },
        minimize: true,
        quiet: true,
// 		router: {
// 			mode: 'history',
// 			routes: [
// 				{
// 					path: '/home',
// 					skeletonId: 'skeleton'
// 				},
// 				{
// 					path: '/login',
// 					skeletonId: 'skeleton2'
// 				}
// 			]
// 		},
      }),
    ],
  },
  
  
  
  devServer: {
    open: true, // 启动服务后是否打开浏览器
    host: '0.0.0.0',
    port: 80, // 服务端口
    hotOnly: false,
    //proxy: null, // 设置代理
    proxy: null,
    // {
      // '/api': {
      //   target: 'http://www.haojiyoujijin.com/hjy_app/api',  // target host
      //   ws: true,  // proxy websockets 
      //   changeOrigin: true,  // needed for virtual hosted sites
      //   pathRewrite: {
      //     '^/api': ''  // rewrite path
      //   }
      // },
      
      // '/hjy_pc_interface': {
      //    target: 'http://192.168.13.110:15000',  // target host
          // target: 'http://192.168.16.51:8000',
        // ws: true,  // proxy websockets 
        // changeOrigin: true,  // needed for virtual hosted sites
        // pathRewrite: {
        //   '^/pc': ''  // rewrite path
        // }
      // }
    // },
    before: app => {}
  },
};