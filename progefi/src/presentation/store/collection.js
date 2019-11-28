const {
    ipcRenderer
} = require('electron')

const collection = {
    namespaced: true,
    state: {
        collections: [],
        institutes: [],
        collection: {
            name: null
        },
        institute: {
            imagePath: null
        }
    },
    mutations: {
        setCollections(state, collections) {
            state.collections = collections;
        },
        setCollection(state, collection) {
            state.collection = collection;
        },
        setInstitutes(state, collections) {
            for (let i = 0; i < collections.length; i++) {
                let element = collections[i];
                var instituteIdExists = state.institutes.find(x => x.id === element.instituteId);
                if (instituteIdExists) {
                    let institute = {
                        id: element.instituteId,
                        name: element.instituteName,
                        researchArea: element.researchArea,
                        imagePath: element.institutePath
                    }
                    state.institute.push(institute);
                }
            }
        },
        setInstitute(state, collection) {
            state.institute = {
                id: collection.instituteId,
                name: collection.instituteName,
                researchArea: collection.instituteResearchArea,
                imagePath: collection.instituteImagePath
            }
        },
    },
    actions: {
        getCollections({ commit }) {
            ipcRenderer.send('getCollections');
            ipcRenderer.on('collections', (event, receivedCollections) => {
                commit('setCollections', receivedCollections);
                commit('setInstitutes', receivedCollections);
            });
        },
        setCollection({ commit }, collection) {
            commit('setCollection', collection);
            commit('setInstitute', collection);
        }
    }
}

export default collection;