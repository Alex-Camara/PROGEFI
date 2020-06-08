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
    },
    reset(state){
      state.tagToCreate = null;
      state.tagToDelete = null;
      state.activeStep = 0;
    }
  },
  actions: {}
};

export default template;
