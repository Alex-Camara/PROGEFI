import Vue from 'vue'
import Vuex from 'vuex'
import datacard from './modelStore/datacard'
import catalogue from './modelStore/catalogue'
import collection from './modelStore/collection'
import project from './modelStore/project'
import climateType from './modelStore/climateType'
import vegetationType from './modelStore/vegetationType'
import speciesData from './modelStore/datacard/speciesData'
import device from './modelStore/device'
import collector from './modelStore/collector'
import location from './modelStore/datacard/location'
import template from './modelStore/template'
import metadata from './generalStore/metadata'
import coordinate from './modelStore/datacard/coordinate'
import curator from './modelStore/curator'
import tag from './modelStore/tag'
import modal from './generalStore/modal'
import loading from './generalStore/loading'
import addDatacard from './generalStore/addDatacard'
import helpText from './generalStore/helpText'

Vue.use(Vuex)

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
    tag: tag,
    modal: modal,
    loading: loading,
    addDatacard: addDatacard,
    helpText: helpText
  },
  actions: {
    resetStore({ commit }) {
      console.log('reseteando...')
      commit('catalogue/resetStore')
      commit('collection/resetStore')
      commit('climateType/resetStore')
      commit('vegetationType/resetStore')
      commit('collector/resetStore')
      commit('curator/resetStore')
      commit('datacard/resetStore')
      commit('device/resetStore')
      commit('location/resetStore')
      commit('project/resetStore')
      commit('speciesData/resetStore')
      commit('template/resetStore')
    }
  }
})

export default store
