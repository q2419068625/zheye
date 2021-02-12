<template>
    <div class="home-page container-md">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../assets/callout.svg" alt="callout" class="w-50"/>
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <router-link to="/create" class="btn btn-primary my-2">开始写文章</router-link>
          </p>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <column-list :list="list"></column-list>
    <button
      class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25"
    >
      加载更多
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import ColumnList from '../components/ColumnList.vue'
import createMessage from '../components/createMessage'
import { useStore } from 'vuex'
import { GlobalDataProps, ResponseType, ImageProps } from '../store'
export default defineComponent({
  name: 'Home',
  components:{
    ColumnList,
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const list = computed(() => store.state.columns)
    const beforeUpload = (file: File) => {
      const isJPG = file.type === 'image/jpeg'
      if(!isJPG) {
        createMessage('上传的图片只能时JPG 格式', 'error')
      }
      return isJPG
    }
    const onFileUpload = (rawData: ResponseType<ImageProps>) => {
      createMessage(`上传图片的ID ${rawData.data._id}`, 'success')
    }
    onMounted(() => {
      store.dispatch('fetchColumns')
    }) 
    return {
      list,
      beforeUpload,
      onFileUpload
    }
  }
})
</script>

<style >

</style>