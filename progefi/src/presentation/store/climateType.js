const {
    ipcRenderer
} = require('electron')

const climateType = {
    namespaced: true,
    state: {
        climateTypes: [],
        climateType: {
            code: null
        }
    },
    mutations: {
        setClimateTypes(state, climateTypes) {
            state.climateTypes = climateTypes;
        },
        setClimateType(state, climateType) {
            console.log(climateType)
            console.log(climateType)
            state.climateType = climateType;
        }
    },
    actions: {
        getClimateTypes({
            commit
        }) {
            ipcRenderer.send('getClimateTypes')
            ipcRenderer.on('climateTypes', (event, receivedClimateTypes) => {
                commit('setClimateTypes', receivedClimateTypes)
            });
        }
    }
}

export default climateType;