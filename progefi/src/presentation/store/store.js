import Vue from "vue";
import Vuex from "vuex";
import datacard from './datacard';
import catalogue from './catalogue';
import collection from './collection';
import project from './project';
import climateType from './climateType';
import vegetationType from './vegetationType';
import speciesData from './speciesData';
import device from './device';
import collector from './collector';
import location from './location';
import template from './template';
import metadata from './metadata';
import coordinate from './coordinate';
import curator from './curator';
import modal from './modal';
import loading from './loading';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    datacard: datacard,
    catalogue: catalogue,
    collection: collection,
    project: project,
    climateType: climateType,
    vegetationType: vegetationType,
    speciesData: speciesData,
    device: device,
    collector: collector,
    location: location,
    template: template,
    metadata: metadata,
    coordinate: coordinate,
    curator: curator,
    modal: modal,
    loading: loading
  }
})

export default store;