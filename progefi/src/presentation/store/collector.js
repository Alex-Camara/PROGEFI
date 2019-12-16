import Validator from '../validators/validator'
const { ipcRenderer } = require('electron')
var validator = new Validator()

const collector = {
  namespaced: true,
  state: {
    collectors: [],
    collector: {
      id: null,
      name: null,
      required: false,
      valid: {
        isValid: false,
        message: null
      }
    }
  },
  getters: {
    collectorsName: state => {
      let collectors = state.collectors
      let collectorsName = []
      for (let i = 0; i < collectors.length; i++) {
        collectorsName.push(collectors[i].name)
      }
      return collectorsName
    }
  },
  mutations: {
    setCollectors (state, collectors) {
      state.collectors = collectors
    },
    setCollector (state, collector) {
      collector.required = state.collector.required
      state.collector = collector
    },
    setRequiredCollector (state, required) {
      state.collector.required = required
    }
  },
  actions: {
    getCollectors ({ commit }, collector) {
      // commit('setCollector', collector)
      if (collector.name != '') {
        ipcRenderer.send('getCollectors', collector.name)
        ipcRenderer.on('collectors', (event, receivedCollectors) => {
          commit('setCollectors', receivedCollectors)
        })
      } else {
        let empty = []
        commit('setCollectors', empty)
      }
    },
    setCollector ({ state, commit, dispatch }, collector) {
      let regex = '^[a-zA-Z \\u00C0-\\u00FF]*$'
      validator
        .testValidationOne(collector.name, 2, 50, state.collector.required, regex)
        .then(() => {
          collector.valid = { isValid: true, message: null }
          commit('setCollector', collector)
          dispatch('getCollectors', collector)
        })
        .catch(error => {
          if (error == 'Campo requerido') {
            collector.valid = { isValid: false, message: error }
            commit('setCollector', collector)
            dispatch('getCollectors', collector)
          } else if (error == 'Longitud mínima invalida') {
            collector.valid = { isValid: false, message: error }
            commit('setCollector', collector)
            dispatch('getCollectors', collector)
          } else if (state.collector.valid.isValid) {
            state.collector.valid = { isValid: true, message: 'temporary error' }
            commit('setCollector', state.collector)
          } else {
            state.collector.valid = { isValid: false, message: error }
            commit('setCollector', state.collector)
          }
        })
    },
    createCollector ({ state }) {
      return new Promise((resolve, reject) => {
        //si el dispositivo ya tiene id, entonces ya existe, solo se regresa el id
        if (state.collector.hasOwnProperty('id') && state.collector.id != null) {
          resolve(state.collector.id)
        } else{
          ipcRenderer.send('createCollector', state.collector)
        ipcRenderer.on('collectorCreated', (event, createdCollectorId) => {
          resolve(createdCollectorId)
        })
        }
      })
    },
    setRequiredValues ({ commit }, tags) {
      let foundCollectorTag = tags.filter(obj => {
        return obj.tag === 'collector'
      })
      if (foundCollectorTag) {
        commit('setRequiredCollector', true)
      } else {
        commit('setRequiredCollector', false)
      }
    }
  }
}

export default collector
