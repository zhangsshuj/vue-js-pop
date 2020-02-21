import Vue from 'vue'
import Vuex from 'vuex'
import feedback from './module/feedback'
import createPersistedState from "vuex-persistedstate";
import * as Cookies from "js-cookie";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      hello: 'hello-1'
  },
  mutations: {
      sendHello(state,data) {
          state.hello = data
      }
  },
  actions: {
  },
  modules: {
      feedback
  },
  plugins: [
      createPersistedState({
          key: '@cube',
          reducer : state => ({'quesData': state.feedback.quesData}),
          storage: localStorage,
          // storage: {
          //     getItem: key => Cookies.get(key),
          //     // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
          //     setItem: (key, value) =>
          //         Cookies.set(key, value, { expires: 9}),
          //     removeItem: key => Cookies.remove(key)
          // }
      })
  ]
})
