<template>
  <div class="container">
    <gobal-header :user="user"></gobal-header>
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
import { defineComponent, reactive, ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'

import ValidateInput, { RulesProp } from './components/ValidateInput.vue'
import ValidateForm from './components/ValidateForm.vue'

import GobalHeader, { UserProps } from './components/GobalHeader.vue'
const testUser: UserProps = {
  isLogin: false,
  name: 'lisi',
}
export default defineComponent({
  name: 'App',
  components: {
    GobalHeader,
    ValidateInput,
    ValidateForm
  },
  setup() {
    return {
      user: testUser,
    }
  },
})
</script>

<style></style>
