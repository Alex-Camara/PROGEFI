import Validator from '../validators/validator'
const { ipcRenderer } = require('electron')
var validator = new Validator()

const curator = {
  namespaced: true,
  state: {
    curators: [],
    selectedCurators: [],
    curator: {
      name: null,
      required: false,
      valid: {
        isValid: false,
        message: null
      }
    },
    selectedCuratorsName: ''
  },
  getters: {
    curatorsName: state => {
      let curators = state.curators
      let curatorsName = []
      for (let i = 0; i < curators.length; i++) {
        let name = curators[i].name
        let nameExists = state.selectedCurators.find(x => x.name == name)
        if (!nameExists) {
          curatorsName.push(name)
        }
      }
      return curatorsName
    },
    selectedCuratorsName: state => {
      let curators = state.selectedCurators
      let curatorsName = []
      state.selectedCuratorsName = ''
      for (let i = 0; i < curators.length; i++) {
        curatorsName.push(curators[i].name)
        state.selectedCuratorsName += curators[i].name + ' | '
      }
      return curatorsName
    }
  },
  mutations: {
    setCurators (state, curators) {
      let filteredCurators = []
      for (let i = 0; i < curators.length; i++) {
        const element = curators[i]
        let foundCurator = state.selectedCurators.find(x => x.name == element.name)
        if (!foundCurator) {
          filteredCurators.push(element)
        }
      }
      state.curators = filteredCurators
    },
    setCurator (state, curator) {
      state.curator = null
      state.curator = curator
    },
    addCurator (state) {
      state.selectedCurators.push(state.curator)
    },
    deleteCurator (state, curator) {
      var index = state.selectedCurators.findIndex(x => x.name == curator)
      state.selectedCurators.splice(index, 1)
    }
  },
  actions: {
    getCurators ({ commit }, curator) {
      if (curator != '') {
        ipcRenderer.send('getCurators', curator)
        ipcRenderer.on('curators', (event, receivedCurators) => {
          commit('setCurators', receivedCurators)
        })
      } else {
        let empty = []
        commit('setCurators', empty)
      }
    },
    setCurator ({ dispatch }, curator) {
      let regex = '^[a-zA-Z \\u00C0-\\u00FF]*$'

      dispatch('validate', {
        testValueName: 'curator',
        testValue: curator,
        mutationName: 'setCurator',
        minLimit: 2,
        maxLimit: 50,
        regex: regex
      })
    },
    addCurator ({ state, commit }) {
      // let curator = state.curator.toLowerCase()
      let foundCurator = state.selectedCurators.find(function(element){
        let curatorInCurators = element.name.toString().toLowerCase();
        let curator = state.curator.name.toString().toLowerCase()
        return curatorInCurators == curator
      })
      //debugger;
      if (!foundCurator) {
        commit('addCurator')
        commit('setCurator', { name: '', valid: { isValid: false, message: null } })
        commit('setCurators', [])
      } else {
        commit('setCurator', { name: '', valid: { isValid: false, message: null } })
        commit('setCurators', [])
      }
    },
    validate ({ state, commit, dispatch }, { testValueName, testValue, mutationName, minLimit, maxLimit, regex }) {
      // si ya se agregaron máximo 2 curadores, la validación falla
      if (state.selectedCurators.length > 1) {
        state[testValueName].valid = { isValid: false, message: 'temporary error' }
        commit(mutationName, state[testValueName])
        commit('setCurators', [])
        return
      }
      validator
        .testValidationOne(testValue.name, minLimit, maxLimit, state[testValueName].required, regex)
        .then(() => {
          //debugger;
          testValue.valid = { isValid: true, message: null }
          commit(mutationName, testValue)
          dispatch('getCurators', testValue.name)
        })
        .catch(error => {
          //debugger;
          // debugger;
          if (error == 'Campo requerido') {
            testValue.valid = { isValid: false, message: error }
            commit(mutationName, testValue)
            commit('setCurators', [])
          } else if (error == 'Longitud mínima invalida') {
            testValue.valid = { isValid: false, message: error }
            commit(mutationName, testValue)
            dispatch('getCurators', testValue.name)
          } else if (error == 'Campo vacío') {
            testValue.valid = { isValid: false, message: 'temporary error' }
            commit(mutationName, testValue)
            commit('setCurators', [])
          } else if (state[testValueName].valid.isValid) {
            state[testValueName].valid = { isValid: true, message: 'temporary error' }
            commit(mutationName, state[testValueName])
          } else {
            state[testValueName].valid = { isValid: false, message: error }
            commit(mutationName, state[testValueName])
          }
        })
    }
  }
}

export default curator
