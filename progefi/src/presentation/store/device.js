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
    // FIXME NO Obtener todos los dispositivos y modelos
    getDevices ({ commit }, device) {
      return new Promise((resolve, reject) => {
        if (device != '') {
          ipcRenderer.send('getDevices', device)
          ipcRenderer.on('devices', (event, receivedDevices) => {
            commit('setDevices', receivedDevices)
            resolve()
          })
        } else {
          let empty = []
          commit('setDevices', empty)
          commit('setModels', empty)
          resolve()
        }
      })
    },
    getModels ({ commit }, deviceId) {
      ipcRenderer.send('getModels', deviceId)
      ipcRenderer.on('models', (event, receivedModels) => {
        commit('setModels', receivedModels)
      })
    },
    async setDevice ({ state, commit, dispatch }, device) {
      // Si el dispositivo ya es un objeto con id, no se valida, solo se guarda
      if (device.hasOwnProperty('id')) {
        device.valid = { isValid: true, message: null }
        commit('setDevice', device)
        dispatch('getModels', device.id)
      } else {
        await dispatch('getDevices', device)

        let foundDevice = state.devices.find(x => x.name == device)
        // Si el dispositivo ya esta registrado en la lista, se obtiene el objeto y no se valida
        if (foundDevice) {
          device = foundDevice
          device.valid = { isValid: true, message: null }
          commit('setDevice', device)
          dispatch('getModels', device.id)
        } else {
          device = { id: null, name: device }
          // El dispositivo no esta registrado, se valida y se crea
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
        }
      }
    },
    setModel ({ state, commit, dispatch }, model) {
      // Si el modelo ya es un objeto con id, no se valida, solo se guarda
      if (model.hasOwnProperty('id')) {
        model.valid = { isValid: true, message: null }
        commit('setModel', model)
      } else {
        model = { id: null, name: model }
        let foundModel = state.models.find(x => x.name == model.name)
        // Si el modelo ya esta registrado en la lista, se obtiene el objeto y no se valida
        if (foundModel) {
          model = foundModel
          model.valid = { isValid: true, message: null }
          commit('setModel', model)
        } else {
          // El modelo no esta registrado, se valida y se crea
          let regex = '^[a-zA-Z0-9 /():_-]*$'

          dispatch('validate', {
            testValueName: 'model',
            testValue: model,
            mutationName: 'setModel',
            minLimit: 2,
            maxLimit: 50,
            regex: regex
          })
        }
      }
      //model.deviceId = state.device.id
    },
    validate (
      { state, commit, dispatch },
      { testValueName, testValue, mutationName, minLimit, maxLimit, regex }
    ) {
      validator
        .testValidationOne(
          testValue.name,
          minLimit,
          maxLimit,
          state[testValueName].required,
          regex
        )
        .then(() => {
          testValue.valid = { isValid: true, message: null }
          commit(mutationName, testValue)
          // if (testValueName == 'device') {
          // dispatch('getModels', testValue.id)
          // }
        })
        .catch(error => {
          if (error == 'Campo requerido') {
            testValue.valid = { isValid: false, message: error }
            commit(mutationName, testValue)
            // if (testValueName == 'device') {
            // dispatch('getModels', testValue.id)
            // }
          } else if (error == 'Longitud mínima invalida') {
            testValue.valid = { isValid: false, message: error }
            commit(mutationName, testValue)
          } else if (state[testValueName].valid.isValid) {
            state[testValueName].valid = {
              isValid: true,
              message: 'temporary error'
            }
            commit(mutationName, state[testValueName])
          } else {
            state[testValueName].valid = { isValid: false, message: error }
            commit(mutationName, state[testValueName])
          }
        })
    },
    createDevice ({ state }) {
      return new Promise((resolve, reject) => {
        //si el dispositivo ya tiene id, entonces ya existe, solo se regresa el id
        if (state.device.hasOwnProperty('id') && state.device.id != null) {
          resolve(state.device.id)
        } else {
          ipcRenderer.send('createDevice', state.device)
          ipcRenderer.on('deviceCreated', (event, createdDeviceId) => {
            resolve(createdDeviceId)
          })
        }
      })
    },
    createModel ({ state }, deviceId) {
      return new Promise((resolve, reject) => {
        //si el modelo ya tiene id, entonces ya existe, solo se regresa el id
        if (state.model.hasOwnProperty('id') && state.model.id != null) {
          resolve(state.model.id)
        } else {
          state.model.deviceId = deviceId
          ipcRenderer.send('createModel', state.model)
          ipcRenderer.on('modelCreated', (event, createdModelId) => {
            resolve(createdModelId)
          })
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
