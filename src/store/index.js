import { createStore } from 'vuex'
import {setItem,getItem} from "@/utils/storage";

export default createStore({
  state: {
    Token: getItem()
  },
  mutations: {
    setToken(state,token){
      console.log('vuex的token>>>>>'+token)
      // 让存储在vuex中的数据 等于 请求服务器传过来的 token值
      state.Token=token
      setItem(token);
    }
  },
  actions: {
  },
  modules: {
  }
})
