import Vue from 'vue'
import App from './App'
import cuCustom from './colorui/components/cu-custom.vue'


import mainpage from './pages/mainpage/home.vue'
Vue.component('mainpage',mainpage)

import discover from './pages/discover/home.vue'
Vue.component('discover',discover)

import message from './pages/message/home.vue'
Vue.component('message',message)

import me from './pages/me/home.vue'
Vue.component('me',me)





Vue.component('cu-custom',cuCustom)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
