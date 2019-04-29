# hjy-project

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### mbw
1、dist文件夹是打包文件夹，不要做修改
2、node是脚手架文件夹，不要做修改
3、public文件夹是用来放置打包不需要压缩的文件，与动态加载的文件
4、src文件夹是项目文件夹，几乎所有的修改都是在src文件夹内

本地调试:终端或cmd 运行 npm run serve

本项目使用的框架是“饿了么UI”。地址：http://element-cn.eleme.io/

$router和$route的关系:
$route为当前router跳转对象里面可以获取name、path、query、params等
$router为VueRouter实例，想要导航到不同URL，则使用$router.push方法等

框架的默认函数获取参数：
变为闭包函数  栗子：@change="((item)=>{getLabel(item, index)})"

'更多详情请下载好基友基金APP'
公告列表，公告详情，购买页面，合同页面

this.$nextTick(()=>{
    //用来获取js加载出来的dom
})

<!-- 命名的路由,下面的结果为 /User/123-->
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>

<!-- 带查询参数，下面的结果为 /register?plan=private -->
<router-link :to="{ path: 'register', query: { plan: 'private' }}">Register</router-link>

<!-- 设置 append 属性后，则在当前 (相对) 路径前添加基路径。 -->
<router-link :to="{ path: 'relative/path'}" append></router-link>

<!-- 设置 replace 属性的话，当点击时，会调用 router.replace() 而不是 router.push()，于是导航后不会留下 history 记录。 -->
<router-link :to="{ path: '/abc'}" replace></router-link>



使用 vue-lazyload 当需要动态切换图片时，DOM绑定的图片不会变，查看插件官方文档跟demo都没有说到这一问题， 难道这个问题就不能解决了，后翻了翻Issuse刚好前辈提了这一问题，原来需要加个 key，遂加之则图片就可以动态切换了，
<img v-lazy="ImgSrc" :key="ImgSrc">



解决Vue相同路由参数不同不会刷新的问题
解决方法：
1、给 router-view 设置 key 属性为路由的完整路径
keep-alive
   router-view :key="$route.fullPath"   router-view
/keep-alive
这种方法我觉得应该是一劳永逸的方法，可能对性能造成一定损耗。不适用于一个tab切换路由并加载列表的组件，会造成页面白屏，dev模式不会自动刷新，是个坑
2、官方给出的方法是通过 watch 监听路由变化，做判断路由路径然后调用响应的方法
watch: {
 '$route' () {
 if (this.$route.path === 'test') {
  this.test();
 }
 }
}
///////////////////////////////////////////
watch: {
 'id': {
 handler: 'test',
 //调用方法
 immediate: true,
 //进入立即执行一次
 }
},
这两种方法推荐第一种，第二种需要先对参数id进行赋值
3、通过组件导航守卫来设置对应的meta 属性
beforeRouteEnter: (to, from, next) = > { // 写在当前组件
 to.meta.keepAlive = false  
 next()
},
 beforeRouteLeave: (to, from, next) = > { //写在前一个组件
 to.meta.keepAlive = false
 next()
},
个人比较喜欢第一种方法


element-UI 表单校验失效处理
1.el-form-item 的 prop属性绑定的要是字符串：
  eg: :prop="'answer[' + 0 + ']' "       //而不是    :prop="answer[0]"
        v-modal="ruleForm.answer[0]"
2.el-form的modal属性绑定表单数据源：后面的prop属性是fuleForm后面的字段而不是fuleForm.answer
  eg: :modal="fuleForm"


data属性名拼接
this[`dialogVisible${key}`] = true;
this['dialogVisible'+key] = true;


