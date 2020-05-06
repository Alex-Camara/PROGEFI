import Vue from 'vue'
import Vuex from 'vuex'
import datacard from './modelStore/datacard'
import metadata from './generalStore/metadata'
import curator from './modelStore/curator'
import modal from './generalStore/modal'
import loading from './generalStore/loading'
import addDatacard from './generalStore/addDatacard'
import helpText from './generalStore/helpText'
import menu from './generalStore/menu'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    datacard,
    metadata,
    curator,
    modal,
    loading,
    addDatacard,
    helpText,
    menu
  },
  actions: {
    resetStore({ commit }) {
      console.log('reseteando...')
      commit('datacard/resetStore')
    }
  }
})

export default store
