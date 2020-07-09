const modal = {
  namespaced: true,
  state: {
    active: false,
    title: "",
    fieldText: "",
    model: "",
    getter: "",
    getterValid: "",
    setter: "",
    saveSexValue: "",
    saveClimateTypeValue: "",
    saveVegetationTypeValue: "",
    saveLifeStageValue: "",
    saveProjectValue: ""
  },
  mutations: {
    setActive(state, value) {
      state.active = value;
    },
    setTitle(state, title) {
      state.title = title;
    },
    setFieldText(state, fieldText) {
      state.fieldText = fieldText;
    },
    setModel(state, model) {
      state.model = model;
    },
    setGetter(state, getter) {
      state.getter = getter;
    },
    setGetterValid(state, getterValid) {
      state.getterValid = getterValid;
    },
    setSetter(state, setter) {
      state.setter = setter;
    },
    setSaveSexValue(state, value) {
      state.saveSexValue = value;
    },
    setSaveClimateTypeValue(state, value) {
      state.saveClimateTypeValue = value;
    },
    setSaveVegetationTypeValue(state, value) {
      state.saveVegetationTypeValue = value;
    },
    setSaveLifeStageValue(state, value) {
      state.saveLifeStageValue = value;
    },
    setSaveProjectValue(state, value) {
      state.saveProjectValue = value;
    },
    reset(state){
      console.log("entró a reset")
      state.active = false;
      state.model = "";
      state.setter = "";
      state.getter = "";
      state.getterValid = "";
      state.title = "";
      state.fieldText = "";
      state.saveSexValue = "";
      state.saveClimateTypeValue = "";
      state.saveVegetationTypeValue = "";
      state.saveLifeStageValue = "";
      state.saveProjectValue = "";
      console.log("reset realizadó: ")
      console.info(state)
    }
  },
  actions: {
    openModal({ commit }, { title, fieldText, model, getter, getterValid, setter }) {
      commit("setActive", true);
      commit("setTitle", title);
      commit("setFieldText", fieldText);
      commit("setModel", model);
      commit("setGetter", getter);
      commit("setGetterValid", getterValid);
      commit("setSetter", setter);
    },
    closeModal({ commit }) {
      commit("setActive", false);
    },
  }
};

export default modal;
