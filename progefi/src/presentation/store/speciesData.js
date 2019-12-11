import Validator from '../validators/validator'

const { ipcRenderer } = require('electron')
var validator = new Validator()

const speciesData = {
  namespaced: true,
  state: {
    scientificName: {
      name: null,
      required: false,
      valid: {
        isValid: false,
        message: null
      }
    },
    commonName: {
      name: null,
      required: false,
      valid: {
        isValid: false,
        message: null
      }
    },
    genus: {
      name: null,
      required: false,
      valid: {
        isValid: false,
        message: null
      }
    },
    order: {
      name: null,
      required: false,
      valid: {
        isValid: false,
        message: null
      }
    },
    family: {
      name: null,
      required: false,
      valid: {
        isValid: false,
        message: null
      }
    },
    speciesClass: {
      name: null,
      required: false,
      valid: {
        isValid: false,
        message: null
      }
    },
    phylum: {
      name: null,
      required: false,
      valid: {
        isValid: false,
        message: null
      }
    },
    kingdom: {
      name: null,
      required: false,
      valid: {
        isValid: false,
        message: null
      }
    },
    sex: {
      name: null,
      required: false,
      valid: {
        isValid: false,
        message: null
      }
    },
    lifeStage: {
      name: null,
      required: false,
      valid: {
        isValid: false,
        message: null
      }
    },
    lifeStages: [],
    sexes: []
  },
  mutations: {
    setScientificName (state, scientificName) {
      scientificName.required = state.scientificName.required
      state.scientificName = scientificName
    },
    setCommonName (state, commonName) {
      commonName.required = state.commonName.required
      state.commonName = commonName
    },
    setGenus (state, genus) {
      genus.required = state.genus.required
      state.genus = genus
    },
    setOrder (state, order) {
      order.required = state.order.required
      state.order = order
    },
    setFamily (state, family) {
      family.required = state.family.required
      state.family = family
    },
    setSpeciesClass (state, speciesClass) {
      speciesClass.required = state.speciesClass.required
      state.speciesClass = speciesClass
    },
    setPhylum (state, phylum) {
      phylum.required = state.phylum.required
      state.phylum = phylum
    },
    setKingdom (state, kingdom) {
      kingdom.required = state.kingdom.required
      state.kingdom = kingdom
    },
    setSex (state, sex) {
      sex.required = state.sex.required
      state.sex = sex
    },
    setLifeStage (state, lifeStage) {
      lifeStage.required = state.lifeStage.required
      state.lifeStage = lifeStage
    },
    setSexes (state, sexes) {
      state.sexes = sexes
    },
    setLifeStages (state, lifeStages) {
      state.lifeStages = lifeStages
    },
    setRequiredValue (state, { valueName, required }) {
      state[valueName].required = required
      // si un campo no es requerido, en su estado inicial tiene el valor de valido
      if (!required) {
        // debugger;
        state.commonName.valid.isValid = false
        state.commonName.valid.isValid = true
        state[valueName].valid.message = 'temporary error'
        // debugger;
      }
    }
  },
  actions: {
    getSexes ({ commit }) {
      ipcRenderer.send('getSexes')
      ipcRenderer.on('sexes', (event, receivedSexes) => {
        commit('setSexes', receivedSexes)
      })
    },
    getLifeStages ({ commit }) {
      ipcRenderer.send('getLifeStages')
      ipcRenderer.on('lifeStages', (event, receivedLifeStages) => {
        commit('setLifeStages', receivedLifeStages)
      })
    },
    setScientificName ({ dispatch }, scientificName) {
      scientificName = { name: scientificName }
      let regex = '^[a-zA-Z \\u00C0-\\u00FF]*$'
      dispatch('validate', {
        testValueName: 'scientificName',
        testValue: scientificName,
        mutationName: 'setScientificName',
        minLimit: 5,
        maxLimit: 45,
        regex: regex
      })
    },
    setCommonName ({ dispatch }, commonName) {
      commonName = { name: commonName }
      let regex = '^[a-zA-Z \\u00C0-\\u00FF]*$'
      dispatch('validate', {
        testValueName: 'commonName',
        testValue: commonName,
        mutationName: 'setCommonName',
        minLimit: 5,
        maxLimit: 45,
        regex: regex
      })
    },
    setGenus ({ dispatch }, genus) {
      genus = { name: genus }
      let regex = '^[a-zA-Z \\u00C0-\\u00FF]*$'
      dispatch('validate', {
        testValueName: 'genus',
        testValue: genus,
        mutationName: 'setGenus',
        minLimit: 4,
        maxLimit: 45,
        regex: regex
      })
    },
    setOrder ({ dispatch }, order) {
      order = { name: order }
      let regex = '^[a-zA-Z \\u00C0-\\u00FF]*$'
      dispatch('validate', {
        testValueName: 'order',
        testValue: order,
        mutationName: 'setOrder',
        minLimit: 5,
        maxLimit: 45,
        regex: regex
      })
    },
    setFamily ({ dispatch }, family) {
      family = { name: family }
      let regex = '^[a-zA-Z \\u00C0-\\u00FF]*$'
      dispatch('validate', {
        testValueName: 'family',
        testValue: family,
        mutationName: 'setFamily',
        minLimit: 5,
        maxLimit: 45,
        regex: regex
      })
    },
    setSpeciesClass ({ dispatch }, speciesClass) {
      speciesClass = { name: speciesClass }
      let regex = '^[a-zA-Z \\u00C0-\\u00FF]*$'
      dispatch('validate', {
        testValueName: 'speciesClass',
        testValue: speciesClass,
        mutationName: 'setSpeciesClass',
        minLimit: 4,
        maxLimit: 45,
        regex: regex
      })
    },
    setPhylum ({ dispatch }, phylum) {
      phylum = { name: phylum }
      let regex = '^[a-zA-Z \\u00C0-\\u00FF]*$'
      dispatch('validate', {
        testValueName: 'phylum',
        testValue: phylum,
        mutationName: 'setPhylum',
        minLimit: 5,
        maxLimit: 45,
        regex: regex
      })
    },
    setKingdom ({ dispatch }, kingdom) {
      kingdom = { name: kingdom }
      let regex = '^[a-zA-Z \\u00C0-\\u00FF]*$'
      dispatch('validate', {
        testValueName: 'kingdom',
        testValue: kingdom,
        mutationName: 'setKingdom',
        minLimit: 5,
        maxLimit: 45,
        regex: regex
      })
    },
    setLifeStage ({ commit, dispatch }, lifeStage) {
      if (lifeStage != null) {
        lifeStage.valid = { isValid: true, message: null }
        commit('setLifeStage', lifeStage)
      } else {
        lifeStage = {name: lifeStage}
        let regex = '^[a-zA-Z \\u00C0-\\u00FF]*$'
        dispatch('validate', {
          testValueName: 'lifeStage',
          testValue: lifeStage,
          mutationName: 'setLifeStage',
          minLimit: 2,
          maxLimit: 20,
          regex: regex
        })
      }
    },
    setSex ({ commit, dispatch }, sex) {
      if (sex != null) {
        sex.valid = { isValid: true, message: null }
        commit('setSex', sex)
      } else {
        sex = {name: sex}
        let regex = '^[a-zA-Z \\u00C0-\\u00FF]*$'
        dispatch('validate', {
          testValueName: 'sex',
          testValue: sex,
          mutationName: 'setSex',
          minLimit: 2,
          maxLimit: 20,
          regex: regex
        })
      }
    },
    validate ({ state, commit }, { testValueName, testValue, mutationName, minLimit, maxLimit, regex }) {
      //debugger;
      validator
        .testValidationOne(testValue.name, minLimit, maxLimit, state[testValueName].required, regex)
        .then(() => {
          testValue.valid = { isValid: true, message: null }
          commit(mutationName, testValue)
        })
        .catch(error => {
          if (error == 'Campo requerido') {
            testValue.valid = { isValid: false, message: error }
            commit(mutationName, testValue)
          } else if (error == 'Longitud mínima invalida') {
            testValue.valid = { isValid: false, message: error }
            commit(mutationName, testValue)
          } else if (error == 'Campo vacío') {
            testValue.valid = { isValid: true, message: 'temporary error' }
            commit(mutationName, testValue)
          } else if (state[testValueName].valid.isValid) {
            state[testValueName].valid = { isValid: true, message: 'temporary error' }
            commit(mutationName, state[testValueName])
          } else {
            state[testValueName].valid = { isValid: false, message: error }
            commit(mutationName, state[testValueName])
          }
        })
    },
    setRequiredValues ({ commit, dispatch }, tags) {
      let localTags = [
        'scientificName',
        'commonName',
        'genus',
        'family',
        'order',
        'phylum',
        'speciesClass',
        'kingdom',
        'sex',
        'lifeStage'
      ]
      for (let i = 0; i < localTags.length; i++) {
        const element = localTags[i]
        let foundTag = tags.filter(obj => {
          return obj.tag === element
        })

        if (foundTag !== undefined && foundTag.length > 0) {
          // debugger
          commit('setRequiredValue', { valueName: element, required: true })
        } else {
          // debugger
          commit('setRequiredValue', { valueName: element, required: false })
        }
        // asignar el valor inicial de los campos para establecer si son validos
        let actionName = 'set' + element[0].toUpperCase() + element.slice(1)
        dispatch(actionName, null)
      }
    }
  }
}

export default speciesData
