<template>
  <div class="container">
    <gobal-header :user="user"></gobal-header>
    <h1>{{error.message}}</h1>
    <loader v-if="isLoading"></loader>
    <router-view></router-view>
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">© 2021 者也专栏</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
  
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useStore } from 'vuex'
import GobalHeader from './components/GobalHeader.vue'
import Loader from './components/Loader.vue'
import { GlobalDataProps } from './store'
export default defineComponent({
  name: 'App',
  components: {
    GobalHeader,
    Loader
  },

  setup() {
    const store = useStore<GlobalDataProps>() 
    const currentUser = computed(() => store.state.user)
    const isLoading = computed(() =>store.state.loading)
    const token = computed(() => store.state.token)
    const error = computed(() => store.state.error)
    onMounted(() => {
      if(!currentUser.value.isLogin && token.value) {
        axios.defaults.headers.common.Authorization = `Bearer ${ token.value }`
        store.dispatch('fetchCurrentUser')
      }
    })
    return {
      user: currentUser,
      isLoading,
      error
    }
  },
})
</script>

<style></style>
