import Validator from '../validators/validator'
const { ipcRenderer } = require('electron')
var validator = new Validator()

const device = {
  namespaced: true,
  state: {
    devices: [],
    models: [],
    device: {
      name: null,
      required: false,
      valid: {
        isValid: false,
        message: null
      }
    },
    model: {
      name: null,
      required: false,
      valid: {
        isValid: false,
        message: null
      }
    }
  },
  mutations: {
    setDevices (state, devices) {
      state.devices = devices
    },
    setModels (state, models) {
      state.models = models
    },
    setDevice (state, device) {
      device.required = state.device.required
      state.device = device
    },
    setRequiredDevice (state, required) {
      state.device.required = required
    },
    setRequiredModel (state, required) {
      state.model.required = required
    },
    setModel (state, model) {
      model.required = state.model.required
      state.model = model
    },
    restoreMetadataValue (state, { attribute, metadataValue }) {
      state[attribute] = {
        name: metadataValue
      }
    }
  },
  actions: {
    getDevices ({ commit }) {
      ipcRenderer.send('getDevices')
      ipcRenderer.on('devices', (event, receivedDevices) => {
        commit('setDevices', receivedDevices)
      })
    },
    getModels ({ commit }, deviceId) {
      ipcRenderer.send('getModels', deviceId)
      ipcRenderer.on('models', (event, receivedModels) => {
        commit('setModels', receivedModels)
      })
    },
    setDevice ({ dispatch }, device) {
      // device.name = device.name.trim()
      let regex = '^[a-zA-Z /()]*$'

      dispatch('validate', {
        testValueName: 'device',
        testValue: device,
        mutationName: 'setDevice',
        minLimit: 2,
        maxLimit: 50,
        regex: regex
      })
    },
    setModel ({ dispatch }, model) {
      let regex = '^[a-zA-Z0-9 /():_-]*$'

      dispatch('validate', {
        testValueName: 'model',
        testValue: model,
        mutationName: 'setModel',
        minLimit: 2,
        maxLimit: 50,
        regex: regex
      })
    },
    validate ({ state, commit, dispatch }, { testValueName, testValue, mutationName, minLimit, maxLimit, regex }) {
      validator
        .testValidationOne(testValue.name, minLimit, maxLimit, state[testValueName].required, regex)
        .then(() => {
          testValue.valid = { isValid: true, message: null }
          commit(mutationName, testValue)
          if (testValueName == 'device') {
            dispatch("getModels", testValue.id);
          }
        })
        .catch(error => {
          if (error == 'Campo requerido') {
            testValue.valid = { isValid: false, message: error }
            commit(mutationName, testValue)
            if (testValueName == 'device') {
              dispatch("getModels", testValue.id);
            }
          } else if (error == 'Longitud mínima invalida') {
            testValue.valid = { isValid: false, message: error }
            commit(mutationName, testValue)
          } else if (state[testValueName].valid.isValid) {
            state[testValueName].valid = { isValid: true, message: 'temporary error' }
            commit(mutationName, state[testValueName])
          } else {
            state[testValueName].valid = { isValid: false, message: error }
            commit(mutationName, state[testValueName])
          }
        })
    },
    setRequiredValues ({ commit }, tags) {
      let foundDeviceTag = tags.filter(obj => {
        return obj.tag === 'device'
      })
      let foundModelTag = tags.filter(obj => {
        return obj.tag === 'model'
      })

      if (foundDeviceTag) {
        commit('setRequiredDevice', true)
      } else {
        commit('setRequiredDevice', false)
      }
      if (foundModelTag) {
        commit('setRequiredModel', true)
      } else {
        commit('setRequiredModel', false)
      }
    }
  }
}

export default device
