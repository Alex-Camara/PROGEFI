const {
    ipcRenderer
} = require('electron')

const catalogue = {
    namespaced: true,
    state: {
        catalogues: [],
        catalogue: {
            name: null
        }
    },
    mutations:{
        setCatalogues(state, catalogues){
            state.catalogues = catalogues;
        },
        setCatalogue(state, catalogue){
            state.catalogue = catalogue;
        }
    },
    actions: {
        getCatalogues({commit, state}, collectionId) {
            ipcRenderer.send('getCatalogues', collectionId)
            ipcRenderer.on('catalogues', (event, receivedCatalogues) => {
                commit('setCatalogues', receivedCatalogues)
            });
        }
    }
}

export default catalogue;