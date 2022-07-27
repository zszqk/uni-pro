// 导入Vue和Vuex
import Vue from 'vue'
import Vuex from 'vuex'
import moduleCart from './cart.js'
// 导入用户的 vuex 模块
import moduleUser from './user.js'
// 将vuex安装为插件
Vue.use(Vuex)
// 创建store的实例对象
const store = new Vuex.Store({
  // 挂载store模块
  modules:{
    m_cart: moduleCart,
    // 挂载用户的 vuex 模块，访问路径为 m_user
        m_user: moduleUser,
  }
})
// 导出store对象
export default store