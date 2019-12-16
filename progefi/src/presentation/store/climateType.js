const { ipcRenderer } = require('electron')

const climateType = {
  namespaced: true,
  state: {
    climateTypes: [],
    climateType: {
      code: null,
      required: false,
      valid: {
        isValid: true,
        message: null
      }
    }
  },
  getters: {
    getClimateTypeId: state => {
      return state.climateType.code
    }
  },
  mutations: {
    setClimateTypes (state, climateTypes) {
      state.climateTypes = climateTypes
    },
    setClimateType (state, climateType) {
      climateType.required = state.climateType.required
      state.climateType = climateType
    },
    setRequired (state, required) {
      state.climateType.required = required
    }
  },
  actions: {
    getClimateTypes ({ commit }) {
      ipcRenderer.send('getClimateTypes')
      ipcRenderer.on('climateTypes', (event, receivedClimateTypes) => {
        commit('setClimateTypes', receivedClimateTypes)
      })
    },
    setClimateType ({ commit }, climateType) {
      if (!climateType.hasOwnProperty('valid')) {
        climateType.valid = { isValid: true, message: null }
      }
      commit('setClimateType', climateType)
    },
    setRequiredValues ({ commit }, tags) {
      let foundClimateTypeTag = tags.filter(obj => {
        return obj.tag === 'climateType'
      })

      if (foundClimateTypeTag) {
        commit('setRequired', true)
        commit('setClimateType', {
          code: null,
          valid: { isValid: false, message: 'Campo requerido' }
        })
      } else {
        commit('setRequired', false)
      }
    }
  }
}

export default climateType
