const {
    ipcRenderer
} = require('electron')

const climateType = {
    namespaced: true,
    state: {
        climateTypes: [
        ],
        vegetationTypes:[],
        vegetalFormations:[]
    },
    mutations:{
        setClimateTypes(state, climatesTypes){
            state.climateTypes = climatesTypes;
        },
        setVegetationTypes(state, vegetationTypes){
            state.vegetationTypes = vegetationTypes;
        },
        setVegetalFormations(state, vegetalFormations){
            state.vegetalFormations = vegetalFormations;
        }
    },
    actions: {
        getClimateTypes({commit}) {
            ipcRenderer.send('getClimateTypes')
            ipcRenderer.on('climateTypes', (event, receivedClimatesTypes) => {
                commit('setClimateTypes', receivedClimatesTypes)
            });
        },
        getVegetationTypes({commit}) {
            ipcRenderer.send('getVegetationTypes')
            ipcRenderer.on('vegetationTypes', (event, receivedVegetationTypes) => {
                commit('setVegetationTypes', receivedVegetationTypes[0])
                commit('setVegetalFormations', receivedVegetationTypes[1])
            });
        }
    }
}

export default climateType;