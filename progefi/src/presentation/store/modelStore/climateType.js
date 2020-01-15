const { ipcRenderer } = require('electron')
import Vue from 'vue'
import ClimateType from '../../models/climateType'

const climateType = {
  namespaced: true,
  state: {
    climateTypes: [],
    climateType: new ClimateType()
  },
  getters: {
    getClimateTypeId: state => {
      return state.climateType.code
    }
  },
  mutations: {
    setClimateTypes (state, climateTypes) {
      Vue.set(state, 'climateTypes', climateTypes)
    },
    setClimateType (state, climateType) {
      Vue.set(state, 'climateType', climateType)
    },
    resetStore (state) {
      Vue.set(state, 'climateType', new ClimateType())
    }
  },
  actions: {
    getClimateTypes ({ commit }) {
      ipcRenderer.send('getClimateTypes')
      ipcRenderer.on('climateTypes', (event, receivedClimateTypes) => {
        let newClimatesTypes = []
        for (let i = 0; i < receivedClimateTypes.length; i++) {
          let climateType = new ClimateType()
          climateType.setClimateType(receivedClimateTypes[i])
          newClimatesTypes.push(climateType)
        }
        commit('setClimateTypes', newClimatesTypes)
      })
    },
    setClimateType ({ commit }, climateType) {
      if (!climateType.hasOwnProperty('id')) {
        let newClimateType = new ClimateType()
        newClimateType.setValid({ isValid: true, message: null })
        newClimateType.setCode(climateType.code)
        commit('setClimateType', newClimateType)
      } else {
        climateType.setValid({ isValid: true, message: null })
        commit('setClimateType', climateType)
      }
    },
    setRequiredValues ({ state, commit }, tags) {
      let foundClimateTypeTag = tags.filter(obj => {
        return obj.tag === 'climateType'
      })
      if (foundClimateTypeTag) {
        state.climateType.setRequired(true)
        state.climateType.setValid({
          isValid: false,
          message: 'Campo requerido'
        })
      } else {
        state.climateType.setRequired(false)
        state.climateType.setValid({
          isValid: true,
          message: null
        })
      }
    }
  }
}

export default climateType
