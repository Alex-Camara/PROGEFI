const {
    ipcRenderer
} = require('electron')

const vegetationType = {
    namespaced: true,
    state: {
        vegetationTypes: [],
        vegetalFormations: []
    },
    mutations: {
        setVegetationTypes(state, vegetationTypes) {
            state.vegetationTypes = vegetationTypes;
        },
        setVegetalFormations(state, vegetationTypes) {
            for (let i = 0; i < vegetationTypes.length; i++) {
                let element = vegetationTypes[i];
                var vegetalFormationIdInArray = state.vegetalFormations.find(x => x.id === element.vegetalFormation_id);
                if (vegetalFormationIdInArray === undefined) {
                    let vegetalFormation = {
                        id: element.vegetalFormation_id,
                        name: element.vegetalFormationName
                    }
                    state.vegetalFormations.push(vegetalFormation);
                }
            }
        }
    },
    actions: {
        getVegetationTypes({
            commit
        }) {
            ipcRenderer.send('getVegetationTypes')
            ipcRenderer.on('vegetationTypes', (event, receivedVegetationTypes) => {
                commit('setVegetationTypes', receivedVegetationTypes)
                commit('setVegetalFormations', receivedVegetationTypes)
            });
        }
    }
}

export default vegetationType;