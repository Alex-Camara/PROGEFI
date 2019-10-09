const {
    ipcRenderer
} = require('electron')

const catalogue = {
    namespaced: true,
    state: {
        catalogues: [
        ]
    },
    mutations:{
        setCatalogues(state, catalogues){
            state.catalogues = catalogues;
        }
    },
    actions: {
        getCatalogues({commit, state}) {
            ipcRenderer.send('getCatalogues')
            ipcRenderer.on('catalogues', (event, receivedCatalogues) => {
                commit('setCatalogues', receivedCatalogues)
            });
        }
    }
}

export default catalogue;