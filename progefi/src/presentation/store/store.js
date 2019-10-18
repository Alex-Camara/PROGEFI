import Vue from "vue";
import Vuex from "vuex";
import datacard from './datacard';
import catalogue from './catalogue';
import collection from './collection';
import project from './project';
import climateType from './climateType';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    datacard: datacard,
    catalogue: catalogue,
    collection: collection,
    project: project,
    climateType: climateType
  }
})

export default store;