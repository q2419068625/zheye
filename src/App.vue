<template>
  <div class="container">
    <gobal-header :user="user"></gobal-header>
    <!-- <column-list :list="list"></column-list> -->
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址:</label>
        <validate-input placeholder="请输入邮箱地址" type="text" :rules="emailRules" v-model="emailVal"></validate-input>
      </div>
      <div class="mb-3">
        <label class="form-label">密码:</label>
        <validate-input placeholder="请输入密码" type="password"  :rules="passwordRules" v-model="passwordVal"></validate-input>
      </div>
      <template #submit>
        <span class="btn btn-danger">Submit</span>
      </template>
    </validate-form>
  </div>
  
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import ValidateInput, { RulesProp } from './components/ValidateInput.vue'
import ValidateForm from './components/ValidateForm.vue'
const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'test1的专栏',
    description: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar:
      'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100',
  },
  {
    id: 2,
    title: 'test2的专栏',
    description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar:
      'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100',
  },
  {
    id: 3,
    title: 'test2的专栏',
    description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar:
      'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100',
  },
  {
    id: 4,
    title: 'test2的专栏',
    description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
    // avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 5,
    title: 'test2的专栏',
    description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar:
      'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100',
  },
]
import GobalHeader, { UserProps } from './components/GobalHeader.vue'
const testUser: UserProps = {
  isLogin: true,
  name: 'lisi',
}
export default defineComponent({
  name: 'App',
  components: {
    ColumnList,
    GobalHeader,
    ValidateInput,
    ValidateForm
  },
  setup() {
    const emailRules: RulesProp = [
      {type: 'required', message: '电子邮箱地址不能为空'},
      {type: 'email', message: '请输入正确的电子邮箱格式'},
    ]
    const passwordRules: RulesProp = [
      {type: 'required', message: '密码不能为空'}
    ]
    const emailVal = ref('')
    const passwordVal = ref('')
    const emailRef = reactive({
      val: '',
      error: false,
      message: ''
    })
    const onFormSubmit = (result: boolean) => {
      console.log('1234', result);
      
    }

    return {
      list: testData,
      user: testUser,
      emailRef,
      emailRules,
      emailVal,
      passwordRules,
      passwordVal,
      onFormSubmit
    }
  },
})
</script>

<style></style>
