import Validator from '../../validators/validator'
import Vue from 'vue'
import SpeciesData from '../../models/speciesData'
import Sex from '../../models/sex'
import LifeStage from '../../models/lifeStage'

const { ipcRenderer } = require('electron')
var validator = new Validator()

const speciesData = {
  namespaced: true,
  state: {
    speciesData: new SpeciesData(),
    lifeStages: [],
    sexes: [],
    requiredValues: {
      scientificName: false,
      commonName: false,
      genus: false,
      speciesClass: false,
      kingdom: false,
      order: false,
      phylum: false,
      sex: false,
      lifeStage: false
    }
  },
  getters: {
    getSexId: state => {
      let sex = state.speciesData.getSex()
      if (sex.getId() != null) {
        return sex.getId()
      } else {
        return sex.getName()
      }
    },
    getLifeStageId: state => {
      let lifeStage = state.speciesData.getLifeStage()
      if (lifeStage.getId() != null) {
        return lifeStage.getId()
      } else {
        return lifeStage.getName()
      }
    }
  },
  mutations: {
    setScientificName (state, { scientificName, isValid, message }) {
      state.speciesData.setScientificNameValid({
        isValid: isValid,
        message: message
      })
      state.speciesData.setScientificName(null)
      state.speciesData.setScientificName(scientificName)
    },
    setCommonName (state, { commonName, isValid, message }) {
      state.speciesData.setCommonNameValid({
        isValid: isValid,
        message: message
      })
      state.speciesData.setCommonName(null)
      state.speciesData.setCommonName(commonName)
    },
    setGenus (state, { genus, isValid, message }) {
      state.speciesData.setGenusValid({ isValid: isValid, message: message })
      state.speciesData.setGenus(null)
      state.speciesData.setGenus(genus)
    },
    setOrder (state, { order, isValid, message }) {
      state.speciesData.setOrderValid({ isValid: isValid, message: message })
      state.speciesData.setOrder(null)
      state.speciesData.setOrder(order)
      // debugger;
    },
    setFamily (state, { family, isValid, message }) {
      state.speciesData.setFamilyValid({ isValid: isValid, message: message })
      state.speciesData.setFamily(null)
      state.speciesData.setFamily(family)
    },
    setSpeciesClass (state, { speciesClass, isValid, message }) {
      state.speciesData.setSpeciesClassValid({
        isValid: isValid,
        message: message
      })
      state.speciesData.setSpeciesClass(null)
      state.speciesData.setSpeciesClass(speciesClass)
    },
    setPhylum (state, { phylum, isValid, message }) {
      state.speciesData.setPhylumValid({ isValid: isValid, message: message })
      state.speciesData.setPhylum(null)
      state.speciesData.setPhylum(phylum)
    },
    setKingdom (state, { kingdom, isValid, message }) {
      state.speciesData.setKingdomValid({ isValid: isValid, message: message })
      state.speciesData.setKingdom(null)
      state.speciesData.setKingdom(kingdom)
    },
    setSex (state, sex) {
      state.speciesData.setSex(sex)
    },
    setLifeStage (state, lifeStage) {
      state.speciesData.setLifeStage(lifeStage)
    },
    setSexes (state, sexes) {
      Vue.set(state, 'sexes', sexes)
    },
    setLifeStages (state, lifeStages) {
      Vue.set(state, 'lifeStages', lifeStages)
    },
    setRequiredValue (state, { tag, required }) {
      state.requiredValues[tag] = required
    },
    resetStore (state) {
      Vue.set(state, 'speciesData', new SpeciesData())
      Vue.set(state, 'sexes', [])
      Vue.set(state, 'lifeStages', [])
    }
  },
  actions: {
    getSexes ({ commit }) {
      ipcRenderer.send('getSexes')
      ipcRenderer.on('sexes', (event, receivedSexes) => {
        let newSexes = []
        for (let i = 0; i < receivedSexes.length; i++) {
          let sex = new Sex()
          sex.setSex(receivedSexes[i])
          newSexes.push(sex)
        }
        commit('setSexes', newSexes)
      })
    },
    getLifeStages ({ commit }) {
      ipcRenderer.send('getLifeStages')
      ipcRenderer.on('lifeStages', (event, receivedLifeStages) => {
        let newLifeStages = []
        for (let i = 0; i < receivedLifeStages.length; i++) {
          let lifeStage = new LifeStage()
          lifeStage.setLifeStage(receivedLifeStages[i])
          newLifeStages.push(lifeStage)
        }
        commit('setLifeStages', newLifeStages)
      })
    },
    setScientificName ({ state, dispatch }, scientificName) {
      let regex = '^[a-zA-Z \\u00C0-\\u00FF]*$'
      let testValue = scientificName
      let oldValue = state.speciesData.getScientificName()
      let testValueName = 'scientificName'
      let minLimit = 5
      let maxLimit = 20
      let isRequired = state.requiredValues.scientificName
      let mutationName = 'setScientificName'
      let isOldValueValid = state.speciesData.isScientificNameValid()

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
    setCommonName ({ state, dispatch }, commonName) {
      let regex = '^[a-zA-Z \\u00C0-\\u00FF]*$'
      let testValue = commonName
      let oldValue = state.speciesData.getCommonName()
      let testValueName = 'commonName'
      let minLimit = 5
      let maxLimit = 20
      let isRequired = state.requiredValues.commonName
      let mutationName = 'setCommonName'
      let isOldValueValid = state.speciesData.isCommonNameValid()

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
    setGenus ({ state, dispatch }, genus) {
      let regex = '^[a-zA-Z \\u00C0-\\u00FF]*$'
      let testValue = genus
      let oldValue = state.speciesData.getGenus()
      let testValueName = 'genus'
      let minLimit = 5
      let maxLimit = 20
      let isRequired = state.requiredValues.genus
      let mutationName = 'setGenus'
      let isOldValueValid = state.speciesData.isGenusValid()

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
    setOrder ({ state, dispatch }, order) {
      let regex = '^[a-zA-Z \\u00C0-\\u00FF]*$'
      let testValue = order
      let oldValue = state.speciesData.getOrder()
      let testValueName = 'order'
      let minLimit = 5
      let maxLimit = 20
      let isRequired = state.requiredValues.order
      let mutationName = 'setOrder'
      let isOldValueValid = state.speciesData.isOrderValid()

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
    setFamily ({ state, dispatch }, family) {
      let regex = '^[a-zA-Z \\u00C0-\\u00FF]*$'
      let testValue = family
      let oldValue = state.speciesData.getFamily()
      let testValueName = 'family'
      let minLimit = 5
      let maxLimit = 20
      let isRequired = state.requiredValues.family
      let mutationName = 'setFamily'
      let isOldValueValid = state.speciesData.isFamilyValid()

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
    setSpeciesClass ({ state, dispatch }, speciesClass) {
      let regex = '^[a-zA-Z \\u00C0-\\u00FF]*$'
      let testValue = speciesClass
      let oldValue = state.speciesData.getSpeciesClass()
      let testValueName = 'speciesClass'
      let minLimit = 5
      let maxLimit = 20
      let isRequired = state.requiredValues.speciesClass
      let mutationName = 'setSpeciesClass'
      let isOldValueValid = state.speciesData.isSpeciesClassValid()

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
    setPhylum ({ state, dispatch }, phylum) {
      let regex = '^[a-zA-Z \\u00C0-\\u00FF]*$'
      let testValue = phylum
      let oldValue = state.speciesData.getPhylum()
      let testValueName = 'phylum'
      let minLimit = 5
      let maxLimit = 20
      let isRequired = state.requiredValues.phylum
      let mutationName = 'setPhylum'
      let isOldValueValid = state.speciesData.isPhylumValid()

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
    setKingdom ({ state, commit, dispatch }, kingdom) {
      let regex = '^[a-zA-Z \\u00C0-\\u00FF]*$'
      let testValue = kingdom
      let oldValue = state.speciesData.getKingdom()
      let testValueName = 'kingdom'
      let minLimit = 5
      let maxLimit = 20
      let isRequired = state.requiredValues.kingdom
      let mutationName = 'setKingdom'
      let isOldValueValid = state.speciesData.isKingdomValid()

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
    validate (
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
    setLifeStage ({ state, commit }, lifeStage) {
      if (lifeStage != null && lifeStage.id != null) {
        lifeStage.setValid({ isValid: true, message: null })
        commit('setLifeStage', lifeStage)
      } else {
        let oldLifeStage = state.speciesData.getSex()
        let newLifeStage = new LifeStage()
        newLifeStage.setName(lifeStage.name)

        let regex = '^[a-zA-Z \\u00C0-\\u00FF]*$'
        validator
          .testValidationOne(
            newLifeStage.getName(),
            2,
            20,
            state.requiredValues.lifeStage,
            regex
          )
          .then(() => {
            newLifeStage.setValid({ isValid: true, message: null })
            commit('setLifeStage', newLifeStage)
          })
          .catch(error => {
            if (
              error == 'Campo requerido' ||
              error == 'Longitud mínima invalida'
            ) {
              newLifeStage.setValid({ isValid: false, message: error })
              commit('setLifeStage', newLifeStage)
            } else if (error == 'Campo vacío') {
              newLifeStage.setValid({
                isValid: true,
                message: 'temporary error'
              })
              commit('setLifeStage', newLifeStage)
            } else if (newLifeStage.isValid()) {
              oldLifeStage.setValid({
                isValid: true,
                message: 'temporary error'
              })
              commit('setLifeStage', oldLifeStage)
            } else {
              oldLifeStage.setValid({ isValid: false, message: error })
              commit('setLifeStage', oldLifeStage)
            }
          })
      }
    },
    setSex ({ state, commit }, sex) {
      if (sex != null && sex.id != null) {
        sex.setValid({ isValid: true, message: null })
        commit('setSex', sex)
      } else {
        let oldSex = state.speciesData.getSex()
        let newSex = new Sex()
        newSex.setName(sex.name)

        let regex = '^[a-zA-Z \\u00C0-\\u00FF]*$'
        validator
          .testValidationOne(
            newSex.getName(),
            2,
            20,
            state.requiredValues.sex,
            regex
          )
          .then(() => {
            newSex.setValid({ isValid: true, message: null })
            commit('setSex', newSex)
          })
          .catch(error => {
            if (
              error == 'Campo requerido' ||
              error == 'Longitud mínima invalida'
            ) {
              newSex.setValid({ isValid: false, message: error })
              commit('setSex', newSex)
            } else if (error == 'Campo vacío') {
              newSex.setValid({ isValid: true, message: 'temporary error' })
              commit('setSex', newSex)
            } else if (newSex.isValid()) {
              oldSex.setValid({ isValid: true, message: 'temporary error' })
              commit('setSex', oldSex)
            } else {
              oldSex.setValid({ isValid: false, message: error })
              commit('setSex', oldSex)
            }
          })
      }
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
          commit('setRequiredValue', { tag: element, required: true })
        } else {
          commit('setRequiredValue', { tag: element, required: false })
        }
        // asignar el valor inicial de los campos para establecer si son validos
        let actionName = 'set' + element[0].toUpperCase() + element.slice(1)
        if (element == 'sex' || element == 'lifeStage') {
          dispatch(actionName, { name: null })
        } else {
          dispatch(actionName, null)
        }
      }
    }
  }
}

export default speciesData
