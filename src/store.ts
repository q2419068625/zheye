import { createStore, Commit } from 'vuex'
import axios from 'axios'
interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
  columnId?:number;
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

export interface GlobalDataProps {
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
  loading: boolean;
  token:string;
}

const getAndCommit = async (url: string , mutationName: string, commit:Commit ) => {
  const { data } =  await axios.get(url)
  commit(mutationName, data)
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
    user: { isLogin: false, name: 'dabu', columnId: 1},
    loading: false,
    token: ''
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
    login(state, rawData) {
      state.token = rawData.data.token
    }
  },
  actions: {
    fetchColumns({commit}) {
      getAndCommit('/api/columns','fetchColumns', commit)
      // const { data } = await axios.get('')
    },
    fetchColumn({ commit }, cid) {
      getAndCommit(`/api/columns/${cid}`,'fetchColumn', commit)
    },
    fetchPosts({ commit }, cid) {
      getAndCommit(`/api/columns/${cid}/posts`,'fetchPosts', commit)
    },
    login({ commit }, payload) {
      return postAndCommit('/api/user/login', 'login', commit, payload)
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