const { ipcRenderer } = require('electron')
import Validator from '../../validators/validator'
var validator = new Validator()
import Vue from 'vue'
import Catalogue from '../../models/catalogue'

const catalogue = {
  namespaced: true,
  state: {
    catalogues: [],
    catalogue: new Catalogue(),
    requiredValues: {
      name: true,
      code: true,
      description: false
    }
  },
  mutations: {
    setCatalogues(state, catalogues) {
      Vue.set(state, 'catalogues', catalogues)
    },
    setCatalogue(state, catalogue) {
      catalogue.setValid({ isValid: true, message: null })
      Vue.set(state, 'catalogue', catalogue)
    },
    setName(state, { name, isValid, message }) {
      state.catalogue.setNameValid({ isValid: isValid, message: message })
      state.catalogue.setName(null)
      state.catalogue.setName(name)
    },
    setCode(state, { code, isValid, message }) {
      // debugger;
      state.catalogue.setCodeValid({ isValid: isValid, message: message })
      state.catalogue.setCode(null)
      state.catalogue.setCode(code)
    },
    setDescription(state, { description, isValid, message }) {
      state.catalogue.setDescriptionValid({ isValid: isValid, message: message })
      state.catalogue.setDescription(null)
      state.catalogue.setDescription(description)
    },
    setCollection(state, { collection, isValid, message }) {
      state.catalogue.setCollectionValid({ isValid: isValid, message: message })
      state.catalogue.setCollection(null)
      state.catalogue.setCollection(collection)
    },
    resetStore(state) {
      Vue.set(state, 'catalogue', new Catalogue())
    }
  },
  actions: {
    getCatalogues({ state, commit, dispatch }, collectionId) {
      // return new Promise((resolve) => {
      if (collectionId == null) {
        ipcRenderer.send('getAllCatalogues')
      } else {
        ipcRenderer.send('getCatalogues', collectionId)
      }

      ipcRenderer.once('catalogues', (event, receivedCatalogues) => {
        let newCatalogues = []
        for (let i = 0; i < receivedCatalogues.length; i++) {
          let catalogue = new Catalogue()
          catalogue.setCatalogue(receivedCatalogues[i])
          newCatalogues.push(catalogue)
        }
        commit('setCatalogues', newCatalogues)
        if (state.catalogue.id != null) {
          dispatch("setCatalogue", state.catalogue)
        }
      });
    },
    createCatalogue({ state }) {
      return new Promise((resolve, reject) => {
        ipcRenderer.send('createCatalogue', state.catalogue);
        ipcRenderer.once('catalogueCreated', event => {
          resolve();
        });
      });
    },
    setCatalogue({ state, commit }, catalogue) {
      // debugger;
      if (state.catalogue.id != null) {
        let catalogue = state.catalogues.find(
          x => x.id == state.catalogue.getId()
        )
        commit('setCatalogue', catalogue)
        // debugger;
      } else {
        commit("setCatalogue", catalogue)
      }
    },
    setName({ state, commit, dispatch }, name) {
      let foundCatalogueName = state.catalogues.find(x => x.name == name)
      if (foundCatalogueName) {
        commit('setName', { name: name, isValid: false, message: "Nombre ya en uso" })
      } else {
        let regex = '^[a-zA-Z \\u00C0-\\u00FF]*$'
        let testValue = name
        let oldValue = state.catalogue.getName()
        let testValueName = 'name'
        let minLimit = 5
        let maxLimit = 50
        let isRequired = state.requiredValues.name
        let mutationName = 'setName'
        let isOldValueValid = state.catalogue.isNameValid()

        dispatch('validate', {
          regex,
          oldValue,
          testValue,
          testValueName,
          minLimit,
          maxLimit,
          isRequired,
          mutationName,
          isOldValueValid
        })
      }
    },
    setCode({ state, commit, dispatch }, code) {
      let foundCatalogueCode = state.catalogues.find(x => x.code == code)
      if (foundCatalogueCode) {
        commit('setCode', { code: code, isValid: false, message: "Código ya en uso" })
      } else {
        let regex = '^[a-zA-Z \\u00C0-\\u00FF\\_-]*$'
        let testValue = code
        let oldValue = state.catalogue.getCode()
        let testValueName = 'code'
        let minLimit = 1
        let maxLimit = 15
        let isRequired = state.requiredValues.code
        let mutationName = 'setCode'
        let isOldValueValid = state.catalogue.isCodeValid()

        dispatch('validate', {
          regex,
          oldValue,
          testValue,
          testValueName,
          minLimit,
          maxLimit,
          isRequired,
          mutationName,
          isOldValueValid
        })
      }
    },
    setDescription({ state, dispatch }, description) {

      let regex = '^[a-zA-Z0-9 \\u00C0-\\u00FF \\/():_.,;{}\\[\\]ñ+=%#$"\'-]*$'
      let testValue = description
      let oldValue = state.catalogue.getDescription()
      let testValueName = 'description'
      let minLimit = 5
      let maxLimit = 50
      let isRequired = state.requiredValues.description
      let mutationName = 'setDescription'
      let isOldValueValid = state.catalogue.isDescriptionValid()

      dispatch('validate', {
        regex,
        oldValue,
        testValue,
        testValueName,
        minLimit,
        maxLimit,
        isRequired,
        mutationName,
        isOldValueValid
      })

    },
    setCollection({ state, commit }, collection) {
      // if (collection != null) {
      commit('setCollection', { collection: collection, isValid: true, message: null })
      // }
    },
    validate(
      { commit },
      {
        regex,
        oldValue,
        testValue,
        testValueName,
        minLimit,
        maxLimit,
        isRequired,
        mutationName,
        isOldValueValid
      }
    ) {
      validator
        .testValidationOne(testValue, minLimit, maxLimit, isRequired, regex)
        .then(() => {
          commit(mutationName, {
            [testValueName]: testValue,
            isValid: true,
            message: null
          })
        })
        .catch(error => {
          // debugger
          if (
            error == 'Campo requerido' ||
            error == 'Longitud mínima invalida'
          ) {
            commit(mutationName, {
              [testValueName]: testValue,
              isValid: false,
              message: error
            })
          } else if (error == 'Campo vacío') {
            commit(mutationName, {
              [testValueName]: testValue,
              isValid: true,
              message: 'temporary error'
            })
          } else if (isOldValueValid) {
            commit(mutationName, {
              [testValueName]: oldValue,
              isValid: true,
              message: 'temporary error'
            })
          } else {
            commit(mutationName, {
              [testValueName]: oldValue,
              isValid: false,
              message: error
            })
          }
        })
    },
  }
}

export default catalogue
