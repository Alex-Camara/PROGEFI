import Vue from "vue";
import Vuex from "vuex";
import datacard from "./modelStore/datacard";
import metadata from "./generalStore/metadata";
import modal from "./generalStore/modal";
import loading from "./generalStore/loading";
import addDatacard from "./generalStore/addDatacard";
import helpText from "./generalStore/helpText";
import menu from "./generalStore/menu";
import template from "./generalStore/template";
import user from "./generalStore/user";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    datacard,
    metadata,
    modal,
    loading,
    addDatacard,
    helpText,
    menu,
    template,
    user
  },
  actions: {
    resetStore({ commit }) {
      console.log("reseteando...");
      commit("datacard/reset");
      commit("addDatacard/reset");
      commit("metadata/resetMetadata");
    }
  }
});

export default store;
