const { ipcRenderer } = require('electron')
import Vue from 'vue'
import Catalogue from '../../models/catalogue'

const catalogue = {
  namespaced: true,
  state: {
    catalogues: [],
    catalogue: new Catalogue()
  },
  mutations: {
    setCatalogues (state, catalogues) {
      Vue.set(state, 'catalogues', catalogues)
    },
    setCatalogue (state, catalogue) {
      catalogue.setValid({ isValid: true, message: null })
      Vue.set(state, 'catalogue', catalogue)
    },
    resetStore (state) {
      Vue.set(state, 'catalogue', new Catalogue())
    }
  },
  actions: {
    getCatalogues ({ commit }, collectionId) {
      ipcRenderer.send('getCatalogues', collectionId)
      ipcRenderer.on('catalogues', (event, receivedCatalogues) => {
        let newCatalogues = []
        for (let i = 0; i < receivedCatalogues.length; i++) {
          let catalogue = new Catalogue()
          catalogue.setCatalogue(receivedCatalogues[i])
          newCatalogues.push(catalogue)
        }
        commit('setCatalogues', newCatalogues)
      })
    }
  }
}

export default catalogue
