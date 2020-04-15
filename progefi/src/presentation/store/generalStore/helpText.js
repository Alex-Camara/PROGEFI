const helpText = {
  namespaced: true,
  state: {
    active: false,
    helpText: null
  },
  mutations: {
    setActive(state, value) {
      state.active = value;
    },
    setHelpText(state, helpText) {
      state.helpText = helpText;
    }
  },
  actions: {
    setActive({ commit }, { active, message }) {
      commit("setActive", active);
      commit("setHelpText", message);
    }
  }
};

export default helpText;
