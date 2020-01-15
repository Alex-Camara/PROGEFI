import Validator from '../../validators/validator'
const { ipcRenderer } = require('electron')
var validator = new Validator()
import Vue from 'vue'
import Curator from '../../models/curator'

const curator = {
  namespaced: true,
  state: {
    curators: [],
    selectedCurators: [],
    curator: new Curator(),
    selectedCuratorsName: ''
  },
  getters: {
    curatorsName: state => {
      let curators = state.curators
      let curatorsName = []
      for (let i = 0; i < curators.length; i++) {
        let name = curators[i].getName()
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
        curatorsName.push(curators[i].getName())
        state.selectedCuratorsName += curators[i].getName() + ' | '
      }
      return curatorsName
    }
  },
  mutations: {
    setCurators (state, curators) {
      let filteredCurators = []
      for (let i = 0; i < curators.length; i++) {
        const element = curators[i]
        let foundCurator = state.selectedCurators.find(
          x => x.name == element.getName()
        )
        if (!foundCurator) {
          filteredCurators.push(element)
        }
      }
      state.curators = filteredCurators
    },
    setCurator (state, curator) {
      Vue.set(state, 'curator', null)
      Vue.set(state, 'curator', curator)
    },
    addCurator (state) {
      state.selectedCurators.push(state.curator)
    },
    deleteCurator (state, curator) {
      var index = state.selectedCurators.findIndex(x => x.name == curator)
      state.selectedCurators.splice(index, 1)
    },
    resetStore (state) {
      Vue.set(state, 'curator', new Curator())
      Vue.set(state, 'curators', [])
      Vue.set(state, 'selectedCurators', [])
      Vue.set(state, 'selectedCuratorsName', '')
    }
  },
  actions: {
    getCurators ({ commit }, curator) {
      if (curator != '') {
        ipcRenderer.send('getCurators', curator)
        ipcRenderer.on('curators', (event, receivedCurators) => {
          let newCurators = []
          for (let i = 0; i < receivedCurators.length; i++) {
            let newCurator = new Curator()
            newCurator.setCurator(receivedCurators[i])
            newCurators.push(newCurator)
          }
          commit('setCurators', newCurators)
        })
      } else {
        let empty = []
        commit('setCurators', empty)
      }
    },
    setCurator ({ state, dispatch }, curator) {
      if (!curator.hasOwnProperty('id')) {
        let newCurator = new Curator()
        newCurator.setName(curator)
        curator = newCurator

        let foundCurator = state.curators.find(
          x => x.name == newCurator.getName()
        )
        if (foundCurator) {
          newCurator = foundCurator
        }
      }

      let regex = '^[a-zA-Z \\u00C0-\\u00FF]*$'

      dispatch('validate', {
        curator: curator,
        minLimit: 2,
        maxLimit: 50,
        regex: regex
      })
    },
    addCurator ({ state, commit }) {
      // let curator = state.curator.toLowerCase()
      let foundCurator = state.selectedCurators.find(function (element) {
        let curatorInCurators = element.name.toString().toLowerCase()
        let curator = state.curator.name.toString().toLowerCase()
        return curatorInCurators == curator
      })
      //debugger;
      if (!foundCurator) {
        commit('addCurator')
        commit('setCurator', new Curator())
        commit('setCurators', [])
      } else {
        commit('setCurator', new Curator())
        commit('setCurators', [])
      }
    },
    createCurators ({ state }) {
      return new Promise((resolve, reject) => {
        let curators = []
        for (let i = 0; i < state.selectedCurators.length; i++) {
          //si el curador ya tiene id, entonces ya existe, solo se regresa el id
          if (state.selectedCurators[i].getId() != null) {
            curators.push(state.selectedCurators[i])
          } else {
            ipcRenderer.send(
              'createCurator',
              state.selectedCurators[i].getName()
            )
            ipcRenderer.on('curatorCreated', (event, createdCurator) => {
              let newCurator = new Curator()
              newCurator.setCurator(createdCurator)
              curators.push(createdCurator)
            })
          }
        }
        resolve(curators)
      })
    },
    validate (
      { state, commit, dispatch },
      { curator, minLimit, maxLimit, regex }
    ) {
      // si ya se agregaron máximo 2 curadores, la validación falla
      if (state.selectedCurators.length > 1) {
        state.curator.setValid({
          isValid: false,
          message: 'temporary error'
        })
        commit('setCurator', state.curator)
        commit('setCurators', [])
        return
      }
      validator
        .testValidationOne(
          curator.getName(),
          minLimit,
          maxLimit,
          state.curator.isRequired(),
          regex
        )
        .then(() => {
          curator.setValid({ isValid: true, message: null })
          commit('setCurator', curator)
          dispatch('getCurators', curator.getName())
        })
        .catch(error => {
          if (error == 'Campo requerido') {
            curator.setValid({ isValid: false, message: error })
            commit('setCurator', curator)
            commit('setCurators', [])
          } else if (error == 'Longitud mínima invalida') {
            curator.setValid({ isValid: false, message: error })
            commit('setCurator', curator)
            dispatch('getCurators', curator.name)
          } else if (error == 'Campo vacío') {
            curator.setValid({ isValid: false, message: 'temporary error' })
            commit('setCurator', curator)
            commit('setCurators', [])
          } else if (state.curator.isValid()) {
            state.curator.setValid({
              isValid: true,
              message: 'temporary error'
            })
            commit('setCurator', state.curator)
          } else {
            state.curator.setValid({ isValid: false, message: error })
            commit('setCurator', state.curator)
          }
        })
    }
  }
}

export default curator
