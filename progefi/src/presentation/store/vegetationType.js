const { ipcRenderer } = require('electron')

const vegetationType = {
  namespaced: true,
  state: {
    vegetationTypes: [],
    vegetalFormations: [],
    vegetationType: {
      name: null,
      required: false,
      valid: {
        isValid: true,
        message: null
      }
    }
  },
  getters:{
    getVegetationTypeId: state =>{
      if (state.vegetationType.hasOwnProperty('id') && state.vegetationType.id != null) {
        return state.vegetationType.id;
      } else{
        return state.vegetationType.name;
      }
    }
  },
  mutations: {
    setVegetationTypes (state, vegetationTypes) {
      state.vegetationTypes = vegetationTypes
    },
    setVegetationType (state, vegetationType) {
      vegetationType.required = state.vegetationType.required
      state.vegetationType = vegetationType
    },
    setVegetalFormations (state, vegetationTypes) {
      for (let i = 0; i < vegetationTypes.length; i++) {
        let element = vegetationTypes[i]
        var vegetalFormationIdInArray = state.vegetalFormations.find(x => x.id === element.vegetalFormationId)
        if (vegetalFormationIdInArray === undefined) {
          let vegetalFormation = {
            id: element.vegetalFormationId,
            name: element.vegetalFormationName,
            imagePath: element.vegetalFormationImagePath
          }
          state.vegetalFormations.push(vegetalFormation)
        }
      }
    },
    setRequired (state, required) {
      state.vegetationType.required = required
    }
  },
  actions: {
    getVegetationTypes ({ commit }) {
      ipcRenderer.send('getVegetationTypes')
      ipcRenderer.on('vegetationTypes', (event, receivedVegetationTypes) => {
        commit('setVegetationTypes', receivedVegetationTypes)
        commit('setVegetalFormations', receivedVegetationTypes)
      })
    },
    setVegetationType ({ commit }, vegetationType) {
      vegetationType.valid = { isValid: true, message: null }
      commit('setVegetationType', vegetationType)
    },
    setRequiredValues ({ commit }, tags) {
      let foundVegetationTypeTag = tags.filter(obj => {
        return obj.tag === 'vegetationType'
      })

      if (foundVegetationTypeTag) {
        commit('setRequired', true)
        commit('setVegetationType', { name: null, valid: { isValid: false, message: 'Campo requerido' } })
      } else {
        commit('setRequired', false)
      }
    }
  }
}

export default vegetationType
