import Validator from '../../validators/validator'
const { ipcRenderer } = require('electron')
var validator = new Validator()
import Collector from '../../models/collector'
import Vue from 'vue'

const collector = {
  namespaced: true,
  state: {
    collectors: [],
    collector: new Collector(),
    // counter to maintain a global variable for collectors code repetition
    codeCounter: 0
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
    setCollectorCode (state, code) {
      state.collector.setCode(code)
    },
    resetStore (state) {
      Vue.set(state, 'collector', null)
      Vue.set(state, 'collector', new Collector())
      Vue.set(state, 'collectors', [])
    }
  },
  actions: {
    getCollectors ({ commit }, collector) {
      if (collector.getName() != '') {
        ipcRenderer.send('getCollectors', collector.getName())
        ipcRenderer.once('collectors', (event, receivedCollectors) => {
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
    async setCollector ({ commit, dispatch }, collector) {
      let foundCollector = await dispatch('checkDuplicateCollector', collector)
      if (foundCollector || collector.hasOwnProperty('id')) {
        collector.setValid({ isValid: true, message: null })
        commit('setCollector', collector)
        // commit('datacard/setCollectorId', collector.getId(), { root: true })
        commit('datacard/setCollector', collector, { root: true })
        commit('datacard/setTempCollectorCode', collector.getCode(), {
          root: true
        })
        dispatch('datacard/setCollectorCode', {}, { root: true })
      } else {
        let regex = '^[a-zA-Z \\u00C0-\\u00FF]*$'
        if (!collector.hasOwnProperty('id')) {
          let newCollector = new Collector()
          newCollector.setName(collector)
          collector = newCollector
          dispatch('validate', {
            collector: collector,
            minLimit: 2,
            maxLimit: 50,
            regex: regex
          })
        }
      }
    },
    checkDuplicateCollector ({ state }, collector) {
      return new Promise((resolve, reject) => {
        let foundCollector = state.collectors.find(function (element) {
          let collectorInCollectors = element.name.toString().toLowerCase()
          collector.toString().toLowerCase()
          return collectorInCollectors == collector
        })
        if (foundCollector) {
          resolve(foundCollector)
        } else {
          resolve(null)
        }
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
          dispatch('createCollectorCode', collector)
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
          resolve(state.collector)
        } else {
          ipcRenderer.send('createCollector', state.collector)
          ipcRenderer.once('collectorCreated', (event, createdCollector) => {
            resolve(createdCollector)
          })
        }
      })
    },
    // Crea el código del colector con base en sus inciales
    createCollectorCode ({ dispatch }, collector) {
      let names = collector.getName().split(' ')
      let code = ''
      for (let i = 0; i < names.length; i++) {
        const name = names[i]
        let firstLetter = name.charAt(0)
        code = code + firstLetter.toUpperCase()
      }
      dispatch('verifyDuplicateCode', code)
    },
    // Verifica si el código del colector no existe ya en la bd
    verifyDuplicateCode ({ state, commit, dispatch }, code) {
      ipcRenderer.send('verifyDuplicateCollectorCode', code)
      ipcRenderer.once('collectorCodeVerified', (event, isCodeDuplicated) => {
        if (isCodeDuplicated) {
          state.codeCounter = state.codeCounter + 1
          let newCode = code + state.codeCounter
          dispatch('verifyDuplicateCode', newCode)
        } else {
          state.codeCounter = 0
          commit('setCollectorCode', code)
          commit('datacard/setCollectorId', null, { root: true })
          commit('datacard/setTempCollectorCode', code, { root: true })
          dispatch('datacard/setCollectorCode', {}, { root: true })
        }
      })
    }
  }
}

export default collector
