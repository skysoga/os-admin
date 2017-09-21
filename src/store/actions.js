import {
  fetchCatalog,
  loginByUsername
} from '../api'
import { getToken, setToken, removeToken } from '@/utils/auth'
export default {
  // ensure data for rendering given list type
  FETCH_CATALOG: ({ commit, state }) => {
    fetchCatalog().then(function (res) {
      var catalogTree = res.data
      var resultCatalogTree = []
      for(let i of catalogTree) {
        var a = new Object()
        a[i.id] = i
        resultCatalogTree.push(a)
      }
      commit('SET_CATALOGTREE', { resultCatalogTree })
    })
  },
  FETCH_SUBCATALOG: ({ commit, state }, catagory) =>{
    commit('SET_SUBCATALOGTREE',catagory)
  },
  LOGINBYUSERNAME({ commit, state }, userInfo) {
    setToken(userInfo)
    commit('SET_TOKEN', userInfo)
  }
}
