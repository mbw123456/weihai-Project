import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/theme/index.css'
import '@/assets/styles/reset.css'
import {post,fetch} from './providers/http-service'
import VueClipboard from 'vue-clipboard2' //复制板功能

import 'swiper/dist/css/swiper.css'

Vue.prototype.$httpPost=post;
Vue.prototype.$httpGet=fetch;

Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.use(VueClipboard); //复制板功能

//判断登录状态
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
      if (store.state.autoLogin=='1') {  // 通过vuex state获取当前的登录状态
          if(to.meta.custType!=null && to.meta.custType.length>0){ 
              console.info(store.state.custType);          
            if(to.meta.custType.includes(store.state.custType)){
                next();
            }else{
                if(store.state.custType=='1' || store.state.custType=='3'){
                    next({
                        path: '/account'
                    })
                }else{
                    next({
                        path: '/account/message'
                    })
                }
                
            }
          }else{
            next();
          }
          next()
      } else {
          next({
              path: '/login',
              query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
      }
  } else {
      next();
  }
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

const API_PATH=window.location.origin+process.env.VUE_APP_BASE_API;
Vue.prototype.API_PATH = API_PATH;