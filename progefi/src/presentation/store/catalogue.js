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
            console.log('recuperando catálogos')
            ipcRenderer.send('getCatalogues')
            ipcRenderer.on('catalogues', (event, receivedCatalogues) => {
                console.log('recibimos los catalogos' + receivedCatalogues)
                commit('setCatalogues', receivedCatalogues)
            });
        }
    }
}

export default catalogue;