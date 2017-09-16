// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@/assets/element/theme/index.css'
import Element from 'element-ui'

import Vue from 'vue'
import App from './App'
import router from './router'


Vue.config.productionTip = false

// 引入“饿了么”界面组件
Vue.use(Element)

// 引入编辑器
//import VueQuillEditor from 'vue-quill-editor'
//Vue.use(VueQuillEditor)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
