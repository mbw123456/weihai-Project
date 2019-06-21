import Vue from 'vue'
import Vuex from 'vuex'
import storage from '@/model/storage.js'
import sessionStorage from '@/model/sessionStorage.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    autoLogin: sessionStorage.get('autoLogin'),                      //用户登录状态
    custName: sessionStorage.get('custName'),
    custType: sessionStorage.get('custType'),
  },
  mutations: {
    //用户登录状态
    changeAutoLogin(state, data = 0) {
      state.autoLogin = data;
      sessionStorage.set('autoLogin', data);
    },

    //用户名设置
    setCustName(state, data) {
      state.custName = data;
      sessionStorage.set('custName', data);
    },

    //用户名设置
    setCustType(state, data) {
      state.custType = data;
      sessionStorage.set('custType', data);
    },
  },
  actions: {

  }
})
