const {
    ipcRenderer
} = require('electron')

const vegetationType = {
    namespaced: true,
    state: {
        vegetationTypes: [],
        vegetalFormations: [],
        vegetationType: {
            name: null
        }
    },
    mutations: {
        setVegetationTypes(state, vegetationTypes) {
            state.vegetationTypes = vegetationTypes;
        },
        setVegetationType(state, vegetationType) {
            state.vegetationType = vegetationType;
        },
        setVegetalFormations(state, vegetationTypes) {
            for (let i = 0; i < vegetationTypes.length; i++) {
                let element = vegetationTypes[i];
                var vegetalFormationIdInArray = state.vegetalFormations.find(x => x.id === element.vegetalFormationId);
                if (vegetalFormationIdInArray === undefined) {
                    let vegetalFormation = {
                        id: element.vegetalFormationId,
                        name: element.vegetalFormationName,
                        imagePath: element.vegetalFormationImagePath
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