const { ipcRenderer } = require('electron')
import Vue from 'vue'
import VegetalFormation from '../../models/vegetalFormation'
import VegetationType from '../../models/vegetationType'

const vegetationType = {
  namespaced: true,
  state: {
    vegetationTypes: [],
    vegetalFormations: [],
    vegetationType: new VegetationType(),
    isVegetationTypeRequired: false
  },
  getters: {
    getVegetationTypeId: state => {
      if (
        state.vegetationType.hasOwnProperty('id') &&
        state.vegetationType.id != null
      ) {
        return state.vegetationType.id
      } else {
        return state.vegetationType.name
      }
    }
  },
  mutations: {
    setVegetalFormations (state, vegetalFormations) {
      Vue.set(state, 'vegetalFormations', vegetalFormations)
    },
    setVegetationTypes (state, vegetationTypes) {
      Vue.set(state, 'vegetationTypes', vegetationTypes)
    },
    setVegetationType (state, vegetationType) {
      vegetationType.setValid({ isValid: true, message: null })
      Vue.set(state, 'vegetationType', vegetationType)
    },
    setRequired (state, required) {
      state.isVegetationTypeRequired = required
      if (required) {
        state.vegetationType.setValid({
          isValid: false,
          message: 'Campo requerido'
        })
      } else {
        state.vegetationType.setValid({ isValid: true, message: null })
      }
    },
    resetStore (state) {
      Vue.set(state, 'vegetationType', new VegetationType())
      Vue.set(state, 'vegetationTypes', [])
      Vue.set(state, 'vegetalFormations', [])
    }
  },
  actions: {
    getVegetationTypes ({ dispatch }) {
      ipcRenderer.send('getVegetationTypes')
      ipcRenderer.on('vegetationTypes', (event, receivedVegetationTypes) => {
        dispatch('setVegetalFormations', receivedVegetationTypes)
      })
    },
    setVegetalFormations ({ commit, dispatch }, vegetationTypes) {
      let newVegetalFormations = []
      for (let i = 0; i < vegetationTypes.length; i++) {
        let element = vegetationTypes[i]
        var vegetalFormationIdInArray = newVegetalFormations.find(
          x => x.id === element.vegetalFormationId
        )
        if (vegetalFormationIdInArray === undefined) {
          let newVegetalFormation = new VegetalFormation()
          newVegetalFormation.setVegetalFormation(element)

          newVegetalFormations.push(newVegetalFormation)
        }
      }
      commit('setVegetalFormations', newVegetalFormations)
      dispatch('setVegetationTypes', vegetationTypes)
    },
    setVegetationTypes ({ state, commit }, vegetationTypes) {
      let newVegetationTypes = []
      for (let i = 0; i < vegetationTypes.length; i++) {
        const element = vegetationTypes[i]
        let newVegetationType = new VegetationType()
        newVegetationType.setVegetationType(element)

        var vegetalFormation = state.vegetalFormations.find(
          x => x.id === element.vegetalFormationId
        )
        newVegetationType.setVegetalFormation(vegetalFormation)
        newVegetationTypes.push(newVegetationType)
      }
      commit('setVegetationTypes', newVegetationTypes)
    },
    setVegetationType ({ commit }, vegetationType) {
      if (!vegetationType.hasOwnProperty('id')) {
        let newVegetationType = new VegetationType()
        newVegetationType.setValid({ isValid: true, message: null })
        newVegetationType.setName(vegetationType.name)
        commit('setVegetationType', newVegetationType)
      } else {
        vegetationType.setValid({ isValid: true, message: null })
        commit('setVegetationType', vegetationType)
      }
    },
    setRequiredValues ({ commit }, tags) {
      let foundVegetationTypeTag = tags.filter(obj => {
        return obj.tag === 'vegetationType'
      })

      if (foundVegetationTypeTag) {
        commit('setRequired', true)
      } else {
        commit('setRequired', false)
      }
    }
  }
}

export default vegetationType
