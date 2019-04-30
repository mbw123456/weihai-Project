import Vue from 'vue'
import Vuex from 'vuex'
import storage from '@/model/storage.js'
import sessionStorage from '@/model/sessionStorage.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    autoLogin: sessionStorage.get('autoLogin'),                      //用户登录状态
    RISK_RESULT: sessionStorage.get('RISK_RESULT'),                  //风险测评
    BANK_CARD: sessionStorage.get('BANK_CARD'),                       //银行卡管理
    custName: sessionStorage.get('custName'),
    riskTime: sessionStorage.get('riskTime'),
    idCard_upload: 0,                                                 //身份证上传次数
    riskType: sessionStorage.get('riskType'),                         //风险测评类型
  },
  mutations: {
    //用户登录状态
    changeAutoLogin(state, data = 0) {
      state.autoLogin = data;
      sessionStorage.set('autoLogin', data);
    },
    //身份证上传次数
    changeIdCardUpload(state, data) {
      state.idCard_upload = data;
      sessionStorage.set('idCard_upload', data);
    },
    //风险测评
    changeRiskResult(state, data) {
      state.RISK_RESULT = data;
      sessionStorage.set('RISK_RESULT', data);
    },
    //风险测评时间
    changeRiskTime(state, data) {
      state.riskTime = data;
      sessionStorage.set('riskTime', data);
    },
    //风险测评类型
    changeRiskType(state, data) {
      state.riskType = data;
      sessionStorage.set('riskType', data);
    },
    //银行卡管理
    setBankCard(state, data) {
      state.BANK_CARD = data;
      sessionStorage.set('BANK_CARD', data);
    },
    //用户名设置
    setCustName(state, data) {
      state.custName = data;
      sessionStorage.set('custName', data);
    },
  },
  actions: {

  }
})
