import { createApp } from 'vue'
import store from './store'
import router from './router'
import axios from 'axios'
import App from './App.vue'

axios.interceptors.request.use(config => {
  store.commit('setLoding', true)
  return config
})

axios.interceptors.response.use(config => {
  store.commit('setLoding', false)
  return config
})


const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
