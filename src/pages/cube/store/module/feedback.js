const state = {
    quesData: localStorage.getItem('@cube')&& localStorage.getItem('@cube')!={}&& localStorage.getItem('@cube')!=''&&JSON.parse(localStorage.getItem('@cube')).quesData&&JSON.parse(localStorage.getItem('@cube')).quesData.length>0 ? JSON.parse(localStorage.getItem('@cube')).quesData : []
}
const actions = {
    sendQuesData({commit,rootState },data) {
        console.log(rootState.hello) // 获取父级state
        commit('setQuesData',data)
        commit('sendHello','hello-2', {root:true})  // 触发父级mutations的方法
        console.log(rootState.hello)
    },
    sameAction: {  // 把模块的方法变为全局的方法
        root: true,
        handler(namespacedContext, payload) {
            console.log('---sb---')
            console.log(namespacedContext)
            console.log(payload)
        }
    }
}
const mutations = {
    setQuesData(state, data) {
        console.log('my-2')
        state.quesData =  data
    }
}
export default {
    namespaced: true,
    state,
    actions,
    mutations
}