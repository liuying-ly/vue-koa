import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import fun from '@/assets/util/fun/index'
Vue.use(fun)
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

let userId=Vue.prototype.$userInfo().ids||''
Vue.prototype.$shopCar =localStorage.getItem('shopCar-'+userId)!==null? JSON.parse(localStorage.getItem('shopCar-'+userId)):[]  //购物车
Vue.prototype.$collect =localStorage.getItem('collect-'+userId)!==null? JSON.parse(localStorage.getItem('collect-'+userId)):[] //购物车

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
