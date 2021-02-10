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
}, e => {
  console.log(e.response);
  const { error } = e.response.data
  store.commit('setError', {status: true, message: error})
  store.commit('setLoding', false)
  return Promise.reject(error)
})


const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
