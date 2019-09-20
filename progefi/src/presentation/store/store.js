import Vue from "vue";
import Vuex from "vuex";
import datacard from './datacard';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    datacard: datacard
  }
})

export default store;