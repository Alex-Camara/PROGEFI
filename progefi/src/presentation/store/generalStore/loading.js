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
    setActive ({ commit }, value) {
      commit('setActive', value)
    },
    setLoadingMessage({commit}, loadingMessage){
      commit("setLoadingMessage", loadingMessage)
    }
  }
}

export default loading
