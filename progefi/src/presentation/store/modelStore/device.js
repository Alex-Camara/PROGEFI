import Validator from '../../validators/validator'
const { ipcRenderer } = require('electron')
var validator = new Validator()
import Device from '../../models/device'
import Model from '../../models/model'
import Vue from 'vue'

const device = {
  namespaced: true,
  state: {
    devices: [],
    models: [],
    device: new Device(),
    model: new Model()
  },
  mutations: {
    setDevices (state, devices) {
      Vue.set(state, 'devices', devices)
    },
    setModels (state, models) {
      Vue.set(state, 'models', models)
    },
    setDevice (state, device) {
      Vue.set(state, 'device', null)
      Vue.set(state, 'device', device)
    },
    setModel (state, model) {
      Vue.set(state, 'model', null)
      Vue.set(state, 'model', model)
    },
    resetStore (state) {
      Vue.set(state, 'device', new Device())
      Vue.set(state, 'model', new Model())
      Vue.set(state, 'devices', [])
      Vue.set(state, 'models', [])
    }
  },
  actions: {
    getDevices ({ commit }, device) {
      return new Promise((resolve, reject) => {
        if (device != '') {
          ipcRenderer.send('getDevices', device)
          ipcRenderer.on('devices', (event, receivedDevices) => {
            let newDevices = []
            for (let i = 0; i < receivedDevices.length; i++) {
              let newDevice = new Device()
              newDevice.setDevice(receivedDevices[i])
              newDevices.push(newDevice)
            }
            commit('setDevices', newDevices)
            resolve()
          })
        } else {
          commit('setDevices', [])
          commit('setModels', [])
          resolve()
        }
      })
    },
    getModels ({ commit }, deviceId) {
      ipcRenderer.send('getModels', deviceId)
      ipcRenderer.on('models', (event, receivedModels) => {
        let newModels = []
        for (let i = 0; i < receivedModels.length; i++) {
          let newModel = new Model()
          newModel.setModel(receivedModels[i])
          newModels.push(newModel)
        }
        commit('setModels', newModels)
      })
    },
    async setDevice ({ state, commit, dispatch }, device) {
      // Si el dispositivo ya es un objeto con id, no se valida, solo se guarda
      if (device.hasOwnProperty('id')) {
        device.setValid({ isValid: true, message: null })
        commit('setDevice', device)
        dispatch('getModels', device.getId())
      } else {
        await dispatch('getDevices', device)

        let foundDevice = state.devices.find(x => x.name == device)
        // Si el dispositivo ya esta registrado en la lista, se obtiene el objeto y no se valida
        if (foundDevice) {
          foundDevice.setValid({ isValid: true, message: null })
          commit('setDevice', foundDevice)
          dispatch('getModels', foundDevice.getId())
        } else {
          // El dispositivo no esta registrado, se valida y se crea
          let newDevice = new Device()
          newDevice.setName(device)

          dispatch('validate', {
            testValueName: 'device',
            testValue: newDevice,
            mutationName: 'setDevice',
            minLimit: 2,
            maxLimit: 50,
            regex: '^[a-zA-Z /()]*$'
          })
        }
      }
    },
    setModel ({ state, commit, dispatch }, model) {
      // Si el modelo ya es un objeto con id, no se valida, solo se guarda
      if (model.hasOwnProperty('id')) {
        model.setValid({ isValid: true, message: null })
        commit('setModel', model)
      } else {
        let foundModel = state.models.find(x => x.name == model)
        // Si el modelo ya esta registrado en la lista, se obtiene el objeto y no se valida
        if (foundModel) {
          foundModel.setValid({ isValid: true, message: null })
          commit('setModel', foundModel)
        } else {
          // El modelo no esta registrado, se valida y se crea
          let newModel = new Model()
          newModel.setName(model)

          dispatch('validate', {
            testValueName: 'model',
            testValue: newModel,
            mutationName: 'setModel',
            minLimit: 2,
            maxLimit: 50,
            regex: '^[a-zA-Z0-9 /():_-]*$'
          })
        }
      }
    },
    validate (
      { state, commit },
      { testValueName, testValue, mutationName, minLimit, maxLimit, regex }
    ) {
      validator
        .testValidationOne(
          testValue.name,
          minLimit,
          maxLimit,
          state[testValueName].isRequired(),
          regex
        )
        .then(() => {
          testValue.setValid({ isValid: true, message: null })
          commit(mutationName, testValue)
        })
        .catch(error => {
          if (error == 'Campo requerido') {
            testValue.setValid({ isValid: false, message: error })
            commit(mutationName, testValue)
          } else if (error == 'Longitud mínima invalida') {
            testValue.setValid({ isValid: false, message: error })
            commit(mutationName, testValue)
          } else if (state[testValueName].isValid()) {
            state[testValueName].setValid({
              isValid: true,
              message: 'temporary error'
            })
            commit(mutationName, state[testValueName])
          } else {
            state[testValueName].setValid({ isValid: false, message: error })
            commit(mutationName, state[testValueName])
          }
        })
    },
    createDevice ({ state }) {
      return new Promise((resolve, reject) => {
        //si el dispositivo ya tiene id, entonces ya existe, solo se regresa el id
        if (state.device.getId() != null) {
          resolve(state.device.getId())
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
        if (state.model.getId() != null) {
          resolve(state.model.getId())
        } else {
          state.model.setDeviceId(deviceId)
          ipcRenderer.send('createModel', state.model)
          ipcRenderer.on('modelCreated', (event, createdModelId) => {
            resolve(createdModelId)
          })
        }
      })
    }
  }
}

export default device
