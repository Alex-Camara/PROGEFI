const loading = {
  namespaced: true,
  state: {
    active: false,
    loadingMessage: null
  },
  mutations: {
    setActive (state, value) {
      state.active = value
    },
    setLoadingMessage (state, loadingMessage) {
      state.loadingMessage = loadingMessage
    }
  },
  actions: {
    setActive ({ commit }, {active, message}) {
      commit('setActive', active)
      commit("setLoadingMessage", message)
    },
    setLoadingMessage({commit}, loadingMessage){
      commit("setLoadingMessage", loadingMessage)
    }
  }
}

export default loading
