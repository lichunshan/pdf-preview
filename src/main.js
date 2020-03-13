import Vue from 'vue'
import App from './App.vue'
import pdfPreview from '../lib/index'
import './assets/iconfont.css'

Vue.config.productionTip = false
Vue.use(pdfPreview);
new Vue({
  render: h => h(App),
}).$mount('#app')
