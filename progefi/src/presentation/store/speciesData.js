const {
    ipcRenderer
} = require('electron')

const speciesData = {
    namespaced: true,
    state: {
        lifeStages: [],
        sexes: []
    },
    mutations: {
        setSexes(state, sexes) {
            state.sexes = sexes;
        },
        setLifeStages(state, lifeStages) {
            state.lifeStages = lifeStages;
        }
    },
    actions: {
        getSexes({
            commit
        }) {
            ipcRenderer.send('getSexes')
            ipcRenderer.on('sexes', (event, receivedSexes) => {
                commit('setSexes', receivedSexes)
            });
        },
        getLifeStages({
            commit
        }) {
            ipcRenderer.send('getLifeStages')
            ipcRenderer.on('lifeStages', (event, receivedLifeStages) => {
                console.info(receivedLifeStages)
                commit('setLifeStages', receivedLifeStages)
            });
        }
    }
}

export default speciesData;