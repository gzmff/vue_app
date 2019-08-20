/* 入口JS */
/* eslint-disable */
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {MessageBox,Button} from 'mint-ui'
import VueLazyload from 'vue-lazyload'//懒加载
import loading from './common/images/timg.gif'
import './mock/mockServer'//加载 mockServer
import './filters/index'//加载自定义过滤器
import 'mint-ui/lib/style.css'

Vue.use(VueLazyload)

// or with options
Vue.use(VueLazyload, {
  loading
})

Vue.component(MessageBox.name, MessageBox)
Vue.component(Button.name, Button)
Vue.$messagebox = Vue.prototype.$messagebox = MessageBox
Vue.$button = Vue.prototype.$button = Button
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
})
