const { ipcRenderer } = require('electron')
import Vue from 'vue'
import Catalogue from '../../models/catalogue'

const catalogue = {
  namespaced: true,
  state: {
    catalogues: [],
    catalogue: new Catalogue(),
    requiredValues: {
      name: true,
      code: true,
      description: false
    }
  },
  mutations: {
    setCatalogues(state, catalogues) {
      Vue.set(state, 'catalogues', catalogues)
    },
    setCatalogue(state, catalogue) {
      catalogue.setValid({ isValid: true, message: null })
      Vue.set(state, 'catalogue', catalogue)
    },
    resetStore(state) {
      Vue.set(state, 'catalogue', new Catalogue())
    }
  },
  actions: {
    getCatalogues({ state, commit, dispatch }, collectionId) {
      // return new Promise((resolve) => {
      if (collectionId == null) {
        ipcRenderer.send('getAllCatalogues')
      } else {
        ipcRenderer.send('getCatalogues', collectionId)
      }

      ipcRenderer.once('catalogues', (event, receivedCatalogues) => {
        let newCatalogues = []
        for (let i = 0; i < receivedCatalogues.length; i++) {
          let catalogue = new Catalogue()
          catalogue.setCatalogue(receivedCatalogues[i])
          newCatalogues.push(catalogue)
        }
        commit('setCatalogues', newCatalogues)
        if (state.catalogue.id != null) {
          dispatch("setCatalogue", state.catalogue)
        }
      });
    },
    createCatalogue({ state }) {
      return new Promise((resolve, reject) => {
        ipcRenderer.send('createCatalogue', state.catalogue);
        ipcRenderer.once('catalogueCreated', event => {
          resolve();
        });
      });
    },
    setCatalogue({ state, commit }, catalogue) {
      // debugger;
      if (state.catalogue.id != null) {
        let catalogue = state.catalogues.find(
          x => x.id == state.catalogue.getId()
        )
        commit('setCatalogue', catalogue)
        // debugger;
      } else {
        commit("setCatalogue", catalogue)
      }
    },
  }
}

export default catalogue
