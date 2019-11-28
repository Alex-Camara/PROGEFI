const {
    ipcRenderer
} = require('electron')

const device = {
    namespaced: true,
    state: {
        devices: [],
        models: [],
        device: {
            name: null
        },
        model: {
            name: null
        }
    },
    mutations: {
        setDevices(state, devices) {
            state.devices = devices;
        },
        setModels(state, models) {
            state.models = models;
        },
        setDevice(state, device) {
            state.device = {
                id: device.id,
                name: device.name
            };
        },
        setModel(state, model) {
            state.model = {
                id: model.id,
                name: model.name
            };
        },
        restoreMetadataValue(state, { attribute, metadataValue }) {
            state[attribute] = {
                name: metadataValue
            }
        }
    },
    actions: {
        getDevices({ commit }) {
            ipcRenderer.send('getDevices')
            ipcRenderer.on('devices', (event, receivedDevices) => {
                commit('setDevices', receivedDevices)
            });
        },
        getModels({ commit }, deviceId) {
            ipcRenderer.send('getModels', deviceId)
            ipcRenderer.on('models', (event, receivedModels) => {
                commit('setModels', receivedModels)
            });
        }
    }
}

export default device;