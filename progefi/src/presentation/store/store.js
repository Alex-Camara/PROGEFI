import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const {
  ipcRenderer
} = require('electron')

const datacard = {
  namespaced: true,
  state: {
    activeStep: 0,
    imageFile: null
  },
  getters: {
    getImageURL: state => {
      var src;
      var reader = new FileReader();

      reader.onloadend = function () {
        console.log("src: " + src);
        //src = reader.result;
        src = 'reader.result';
        console.log("src: " + src);
        return 'reader';
      };

      if (state.imageFile) {
        reader.readAsDataURL(state.imageFile);
      } else {
        return "src";
      }
    }
  },
  mutations: {
    changeActiveStep(state, activeStep) {
      state.activeStep = activeStep
    },
    addImageFile(state, imageFile) {
      if (imageFile != null) {
        state.imageFile = imageFile

        var file = {"name": imageFile.name, "path": imageFile.path};
        ipcRenderer.send('saveImageFile', file)
      }

    }
  },
  actions: {}
}

const store = new Vuex.Store({
  modules: {
    datacard: datacard
  }
})

export default store;