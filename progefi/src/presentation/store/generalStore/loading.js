const loading = {
  namespaced: true,
  state: {
    active: false
  },
  mutations: {
    setActive (state, value) {
      state.active = value
    }
  },
  actions: {
    setActive ({ commit }, value) {
      commit('setActive', value)
    }
  }
}

export default loading
