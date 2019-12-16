const { ipcRenderer } = require('electron')

const catalogue = {
  namespaced: true,
  state: {
    catalogues: [],
    catalogue: {
      id: null,
      name: null,
      required: true,
      valid: {
        isValid: false,
        message: 'Campo requerido'
      }
    }
  },
  mutations: {
    setCatalogues (state, catalogues) {
      state.catalogues = catalogues
    },
    setCatalogue (state, catalogue) {
      catalogue.required = state.catalogue.required
      catalogue.valid = { isValid: true, message: null }
      state.catalogue = catalogue
    }
  },
  actions: {
    getCatalogues ({ commit, state }, collectionId) {
      ipcRenderer.send('getCatalogues', collectionId)
      ipcRenderer.on('catalogues', (event, receivedCatalogues) => {
        commit('setCatalogues', receivedCatalogues)
      })
    }
  }
}

export default catalogue
