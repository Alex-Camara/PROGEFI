import Vue from "vue";
import Vuex from "vuex";
import datacard from './datacard';
import catalogue from './catalogue';
import collection from './collection';
import project from './project';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    datacard: datacard,
    catalogue: catalogue,
    collection: collection,
    project: project
  }
})

export default store;