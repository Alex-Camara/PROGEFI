const {
    ipcRenderer
} = require('electron')

const climateType = {
    namespaced: true,
    state: {
        climateTypes: []
    },
    mutations:{
        setClimateTypes(state, climatesTypes){
            state.climateTypes = climatesTypes;
        }
    },
    actions: {
        getClimateTypes({commit}) {
            ipcRenderer.send('getClimateTypes')
            ipcRenderer.on('climateTypes', (event, receivedClimatesTypes) => {
                commit('setClimateTypes', receivedClimatesTypes)
            });
        }
    }
}

export default climateType;