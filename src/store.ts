import { createStore, Commit } from 'vuex'
import axios from 'axios'

export interface ResponseType<P = {}> {
  code: number;
  msg: string;
  data: P
}
export interface UserProps {
  isLogin: boolean;
  nickName?: string;
  _id?: string;
  column?: string;
  email?: string;
}
export interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
  fitUrl?: string;
}
export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}
export interface PostProps {
  _id?: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: ImageProps | string;
  createdAt?: string;
  column: string;
  author?: string | UserProps;
  isHTML?: boolean;
}
export interface GlobalErrorProps {
  status: boolean;
  message?:string
}
export interface GlobalDataProps {
  error: GlobalErrorProps;
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
  loading: boolean;
  token:string;
}

const getAndCommit = async (url: string , mutationName: string, commit:Commit ) => {
  const { data } =  await axios.get(url)
  commit(mutationName, data)
  return data
}
const postAndCommit = async (url: string , mutationName: string, commit:Commit, payload:any ) => {
  const { data } =  await axios.post(url, payload)
  commit(mutationName, data)
  return data
}

const store = createStore<GlobalDataProps>({
  state: {
    columns: [],
    posts: [],
    user: { isLogin: false},
    loading: false,
    token: localStorage.getItem('token') || '',
    error: {status: false}
  },
  mutations: {
    // login(state) {
    //   state.user = {...state.user, isLogin: true, name: 'dabu', columnId: 1}
    // },
    createPost(state, newPost) {
      state.posts.push(newPost)
    },
    fetchColumns(state, rawData) {
      state.columns = rawData.data.list
    },
    fetchColumn(state, rawData) {
      state.columns = [rawData.data]
    },
    fetchPosts(state, rawData) {
      state.posts = rawData.data.list
    },
    setLoding(state, status) {
      state.loading = status
    },
    setError(state, e: GlobalErrorProps) {
      state.error = e
    },
    login(state, rawData) {
      const { token } = rawData.data
      state.token = token
      localStorage.setItem('token', token)
      axios.defaults.headers.common.Authorization = `Bearer ${ token }`
    },
    fetchCurrentUser(state, rawData) {
      state.user = {isLogin: true , ...rawData.data}
    },
    logout(state) {
      state.token = ''
      localStorage.removeItem('token')
      delete axios.defaults.headers.common.Authorization
    }
  },
  actions: {
    fetchColumns({commit}) {
      return getAndCommit('/api/columns','fetchColumns', commit)
      // const { data } = await axios.get('')
    },
    fetchColumn({ commit }, cid) {
      return getAndCommit(`/api/columns/${cid}`,'fetchColumn', commit)
    },
    fetchPosts({ commit }, cid) {
      return getAndCommit(`/api/columns/${cid}/posts`,'fetchPosts', commit)
    },
    login({ commit }, payload) {
      return postAndCommit('/api/user/login', 'login', commit, payload)
    },
    createPost({ commit }, payload) {
      return postAndCommit('/api/posts', 'login', commit, payload)
    },
    fetchCurrentUser({commit}) {
      return getAndCommit('/api/user/current','fetchCurrentUser', commit)
    },
    loginAndfetch({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => {
        return dispatch('fetchCurrentUser')
      })
    }
  },
  getters: {
    getColumnById: (state) => (id: string) => {
      return state.columns.find(c => c._id === id)
    },
    getPostsByCid: (state) => (cid: string) => {
      return state.posts.filter(post => post.column === cid)
    }
  }
  
})

export default store