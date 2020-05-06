const template = {
  namespaced: true,
  state: {
    tagToCreate: null,
    tagToDelete: null,
    activeStep: 0
  },
  mutations: {
    setCreatedTag(state, tag) {
      state.tagToCreate = tag;
    },
    deleteTag(state, tag){
      state.tagToDelete = tag;
    },
    setActiveStep(state, step){
      state.activeStep = step;
    }
  },
  actions: {}
};

export default template;
