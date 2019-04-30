import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/theme/index.css'
import '@/assets/styles/reset.css'
import {post,fetch} from './providers/http-service'
import VueClipboard from 'vue-clipboard2' //复制板功能



Vue.prototype.$httpPost=post;
Vue.prototype.$httpGet=fetch;

Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.use(VueClipboard); //复制板功能

//判断登录状态
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
      if (store.state.autoLogin=='1') {  // 通过vuex state获取当前的登录状态
          next();
      }
      else {
          next({
              path: '/login',
              query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
      }
  }
  else {
      next();
  }
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')