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
    setDevices(state, devices) {
      Vue.set(state, 'devices', devices)
    },
    setModels(state, models) {
      Vue.set(state, 'models', models)
    },
    setDevice(state, device) {
      Vue.set(state, 'device', null)
      Vue.set(state, 'device', device)
    },
    setModel(state, model) {
      Vue.set(state, 'model', null)
      Vue.set(state, 'model', model)
    },
    resetStore(state) {
      Vue.set(state, 'device', new Device())
      Vue.set(state, 'model', new Model())
      Vue.set(state, 'devices', [])
      Vue.set(state, 'models', [])
    }
  },
  actions: {
  }
}

export default device
