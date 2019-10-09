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
            console.log('recuperando colecciones')
            ipcRenderer.send('getCollections')
            ipcRenderer.on('collections', (event, receivedCollections) => {
                console.log('recibimos las colecciones' + receivedCollections)
                commit('setCollections', receivedCollections)
            });
        }
    }
}

export default collection;