const {
    ipcRenderer
} = require('electron')

const collection = {
    namespaced: true,
    state: {
        collections: [
        ]
    },
    mutations:{
        setCollections(state, collections){
            state.collections = collections;
        }
    },
    actions: {
        getCollections({commit}) {
            ipcRenderer.send('getCollections')
            ipcRenderer.on('collections', (event, receivedCollections) => {
                console.log('colecciones recibidas' + receivedCollections[0].name)
                commit('setCollections', receivedCollections)
            });
        }
    }
}

export default collection;