import Validator from '../../validators/validator'
const { ipcRenderer } = require('electron')
var validator = new Validator()
import Collector from '../../models/collector'
import Vue from 'vue'

const collector = {
  namespaced: true,
  state: {
    collectors: [],
    collector: new Collector()
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
      Vue.set(state, 'collectors', collectors)
    },
    setCollector (state, collector) {
      Vue.set(state, 'collector', null)
      Vue.set(state, 'collector', collector)
    },
    resetStore (state) {
      Vue.set(state, 'collector', null)
      Vue.set(state, 'collector', new Collector())
      Vue.set(state, 'collectors', [])
    }
  },
  actions: {
    getCollectors ({ commit }, collector) {
      if (collector.name != '') {
        ipcRenderer.send('getCollectors', collector.getName())
        ipcRenderer.on('collectors', (event, receivedCollectors) => {
          let newCollectors = []
          for (let i = 0; i < receivedCollectors.length; i++) {
            let newCollector = new Collector()
            newCollector.setCollector(receivedCollectors[i])
            newCollectors.push(newCollector)
          }
          commit('setCollectors', newCollectors)
        })
      } else {
        let empty = []
        commit('setCollectors', empty)
      }
    },
    setCollector ({ dispatch }, collector) {
      let regex = '^[a-zA-Z \\u00C0-\\u00FF]*$'
      if (!collector.hasOwnProperty('id')) {
        let newCollector = new Collector()
        newCollector.setName(collector)
        collector = newCollector
      }
      dispatch('validate', {
        collector: collector,
        minLimit: 2,
        maxLimit: 50,
        regex: regex
      })
    },
    validate (
      { state, commit, dispatch },
      { collector, regex, minLimit, maxLimit }
    ) {
      validator
        .testValidationOne(
          collector.getName(),
          minLimit,
          maxLimit,
          state.collector.isRequired(),
          regex
        )
        .then(() => {
          collector.setValid({
            isValid: true,
            message: null
          })
          commit('setCollector', collector)
          dispatch('getCollectors', collector)
        })
        .catch(error => {
          if (error == 'Campo requerido') {
            collector.setValid({
              isValid: false,
              message: error
            })
            commit('setCollector', collector)
            dispatch('getCollectors', collector)
          } else if (error == 'Longitud mínima invalida') {
            collector.setValid({ isValid: false, message: error })
            commit('setCollector', collector)
            dispatch('getCollectors', collector)
          } else if (state.collector.isValid()) {
            state.collector.setValid({
              isValid: true,
              message: 'temporary error'
            })
            commit('setCollector', state.collector)
          } else {
            state.collector.setValid({
              isValid: false,
              message: error
            })
            commit('setCollector', state.collector)
          }
        })
    },
    createCollector ({ state }) {
      return new Promise((resolve, reject) => {
        //si el dispositivo ya tiene id, entonces ya existe, solo se regresa el id
        if (state.collector.getId() != null) {
          resolve(state.collector.getId())
        } else {
          ipcRenderer.send('createCollector', state.collector)
          ipcRenderer.on('collectorCreated', (event, createdCollectorId) => {
            resolve(createdCollectorId)
          })
        }
      })
    },
    setRequiredValues ({ state }, tags) {
      let foundCollectorTag = tags.filter(obj => {
        return obj.tag === 'collector'
      })
      if (foundCollectorTag) {
        state.collector.setRequired(true)
        state.collector.setValid({
          isValid: false,
          message: 'Campo requerido'
        })
      } else {
        state.collector.setRequired(true)
        state.collector.setValid({
          isValid: true,
          message: null
        })
      }
    }
  }
}

export default collector
