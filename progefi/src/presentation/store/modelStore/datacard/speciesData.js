import Validator from '../../../validators/validator'
import Vue from 'vue'
import Sex from '../../../models/sex'
import LifeStage from '../../../models/lifeStage'
import Datacard from '../../../models/datacard'


const { ipcRenderer } = require('electron')
var validator = new Validator()

const speciesData = {
  namespaced: true,
  state: {
    // speciesData: new SpeciesData(),
    datacard: new Datacard(),
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
      let sex = state.datacard.getSex()
      if (sex.getId() != null) {
        return sex.getId()
      } else {
        return sex.getName()
      }
    },
    getLifeStageId: state => {
      let lifeStage = state.datacard.getLifeStage()
      if (lifeStage.getId() != null) {
        return lifeStage.getId()
      } else {
        return lifeStage.getName()
      }
    }
  },
  mutations: {
    setDatacard(state, datacard) {
      Vue.set(state, 'datacard', datacard)
    },
    setScientificName(state, { scientificName, isValid, message }) {
      state.datacard.setScientificNameValid({
        isValid: isValid,
        message: message
      })
      state.datacard.setScientificName(null)
      state.datacard.setScientificName(scientificName)
    },
    setCommonName(state, { commonName, isValid, message }) {
      state.datacard.setCommonNameValid({
        isValid: isValid,
        message: message
      })
      state.datacard.setCommonName(null)
      state.datacard.setCommonName(commonName)
    },
    setGenus(state, { genus, isValid, message }) {
      state.datacard.setGenusValid({ isValid: isValid, message: message })
      state.datacard.setGenus(null)
      state.datacard.setGenus(genus)
    },
    setOrder(state, { order, isValid, message }) {
      state.datacard.setOrderValid({ isValid: isValid, message: message })
      state.datacard.setOrder(null)
      state.datacard.setOrder(order)
      // debugger;
    },
    setFamily(state, { family, isValid, message }) {
      state.datacard.setFamilyValid({ isValid: isValid, message: message })
      state.datacard.setFamily(null)
      state.datacard.setFamily(family)
    },
    setSpeciesClass(state, { speciesClass, isValid, message }) {
      state.datacard.setSpeciesClassValid({
        isValid: isValid,
        message: message
      })
      state.datacard.setSpeciesClass(null)
      state.datacard.setSpeciesClass(speciesClass)
    },
    setPhylum(state, { phylum, isValid, message }) {
      state.datacard.setPhylumValid({ isValid: isValid, message: message })
      state.datacard.setPhylum(null)
      state.datacard.setPhylum(phylum)
    },
    setKingdom(state, { kingdom, isValid, message }) {
      state.datacard.setKingdomValid({ isValid: isValid, message: message })
      state.datacard.setKingdom(null)
      state.datacard.setKingdom(kingdom)
    },
    setObservations(state, observations) {
      state.datacard.setObservations(null)
      state.datacard.setObservations(observations)
    },
    setSex(state, sex) {
      state.datacard.setSex(sex)
    },
    setLifeStage(state, lifeStage) {
      state.datacard.setLifeStage(lifeStage)
    },
    setSexes(state, sexes) {
      Vue.set(state, 'sexes', sexes)
    },
    setLifeStages(state, lifeStages) {
      Vue.set(state, 'lifeStages', lifeStages)
    },
    setRequiredValue(state, { tag, required }) {
      state.requiredValues[tag] = required
    },
    resetStore(state) {
      Vue.set(state, 'datacard', new Datacard())
      Vue.set(state, 'sexes', [])
      Vue.set(state, 'lifeStages', [])
    }
  },
  actions: {
    getSexes({ commit }) {
      ipcRenderer.send('getSexes')
      ipcRenderer.once('sexes', (event, receivedSexes) => {
        let newSexes = []
        for (let i = 0; i < receivedSexes.length; i++) {
          let sex = new Sex()
          sex.setSex(receivedSexes[i])
          newSexes.push(sex)
        }
        commit('setSexes', newSexes)
      })
    },
    getLifeStages({ commit }) {
      ipcRenderer.send('getLifeStages')
      // debugger
      ipcRenderer.once('lifeStages', (event, receivedLifeStages) => {
        // debugger;
        let newLifeStages = []
        for (let i = 0; i < receivedLifeStages.length; i++) {
          let lifeStage = new LifeStage()
          lifeStage.setLifeStage(receivedLifeStages[i])
          newLifeStages.push(lifeStage)
        }
        
        commit('setLifeStages', newLifeStages)
      })
    },
    setScientificName({ state, dispatch }, scientificName) {
      let regex = '^[a-zA-Z \\u00C0-\\u00FF]*$'
      let testValue = scientificName
      let oldValue = state.datacard.getScientificName()
      let testValueName = 'scientificName'
      let minLimit = 5
      let maxLimit = 50
      let isRequired = state.requiredValues.scientificName
      let mutationName = 'setScientificName'
      let isOldValueValid = state.datacard.isScientificNameValid()

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
    setCommonName({ state, dispatch }, commonName) {
      let regex = '^[a-zA-Z \\u00C0-\\u00FF]*$'
      let testValue = commonName
      let oldValue = state.datacard.getCommonName()
      let testValueName = 'commonName'
      let minLimit = 5
      let maxLimit = 50
      let isRequired = state.requiredValues.commonName
      let mutationName = 'setCommonName'
      let isOldValueValid = state.datacard.isCommonNameValid()

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
    setGenus({ state, dispatch }, genus) {
      let regex = '^[a-zA-Z \\u00C0-\\u00FF]*$'
      let testValue = genus
      let oldValue = state.datacard.getGenus()
      let testValueName = 'genus'
      let minLimit = 3
      let maxLimit = 50
      let isRequired = state.requiredValues.genus
      let mutationName = 'setGenus'
      let isOldValueValid = state.datacard.isGenusValid()

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
    setOrder({ state, dispatch }, order) {
      let regex = '^[a-zA-Z \\u00C0-\\u00FF]*$'
      let testValue = order
      let oldValue = state.datacard.getOrder()
      let testValueName = 'order'
      let minLimit = 5
      let maxLimit = 50
      let isRequired = state.requiredValues.order
      let mutationName = 'setOrder'
      let isOldValueValid = state.datacard.isOrderValid()

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
    setFamily({ state, dispatch }, family) {
      let regex = '^[a-zA-Z \\u00C0-\\u00FF]*$'
      let testValue = family
      let oldValue = state.datacard.getFamily()
      let testValueName = 'family'
      let minLimit = 5
      let maxLimit = 50
      let isRequired = state.requiredValues.family
      let mutationName = 'setFamily'
      let isOldValueValid = state.datacard.isFamilyValid()

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
    setSpeciesClass({ state, dispatch }, speciesClass) {
      let regex = '^[a-zA-Z \\u00C0-\\u00FF]*$'
      let testValue = speciesClass
      let oldValue = state.datacard.getSpeciesClass()
      let testValueName = 'speciesClass'
      let minLimit = 3
      let maxLimit = 50
      let isRequired = state.requiredValues.speciesClass
      let mutationName = 'setSpeciesClass'
      let isOldValueValid = state.datacard.isSpeciesClassValid()

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
    setPhylum({ state, dispatch }, phylum) {
      let regex = '^[a-zA-Z \\u00C0-\\u00FF]*$'
      let testValue = phylum
      let oldValue = state.datacard.getPhylum()
      let testValueName = 'phylum'
      let minLimit = 5
      let maxLimit = 50
      let isRequired = state.requiredValues.phylum
      let mutationName = 'setPhylum'
      let isOldValueValid = state.datacard.isPhylumValid()

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
    setKingdom({ state, commit, dispatch }, kingdom) {
      let regex = '^[a-zA-Z \\u00C0-\\u00FF]*$'
      let testValue = kingdom
      let oldValue = state.datacard.getKingdom()
      let testValueName = 'kingdom'
      let minLimit = 5
      let maxLimit = 50
      let isRequired = state.requiredValues.kingdom
      let mutationName = 'setKingdom'
      let isOldValueValid = state.datacard.isKingdomValid()

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
          commit('datacard/' + mutationName, testValue, { root: true })
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
    // setLifeStage({ state, commit }, lifeStage) {
      // if (lifeStage != null && lifeStage.id != null) {
        // lifeStage.setValid({ isValid: true, message: null })
        // commit('setLifeStage', lifeStage)
        // commit('datacard/setLifeStage', lifeStage, { root: true })
      // } else {
        // let oldLifeStage = state.datacard.getSex()
        // let newLifeStage = new LifeStage()
        // newLifeStage.setName(lifeStage.name)
// 
        // let regex = '^[a-zA-Z \\u00C0-\\u00FF]*$'
        // validator
          // .testValidationOne(
            // newLifeStage.getName(),
            // 2,
            // 20,
            // state.requiredValues.lifeStage,
            // regex
          // )
          // .then(() => {
            // newLifeStage.setValid({ isValid: true, message: null })
            // commit('setLifeStage', newLifeStage)
            // commit('datacard/setLifeStage', lifeStage, { root: true })
          // })
          // .catch(error => {
            // if (
              // error == 'Campo requerido' ||
              // error == 'Longitud mínima invalida'
            // ) {
              // newLifeStage.setValid({ isValid: false, message: error })
              // commit('setLifeStage', newLifeStage)
            // } else if (error == 'Campo vacío') {
              // newLifeStage.setValid({
                // isValid: true,
                // message: 'temporary error'
              // })
              // commit('setLifeStage', newLifeStage)
            // } else if (newLifeStage.isValid()) {
              // oldLifeStage.setValid({
                // isValid: true,
                // message: 'temporary error'
              // })
              // commit('setLifeStage', oldLifeStage)
            // } else {
              // oldLifeStage.setValid({ isValid: false, message: error })
              // commit('setLifeStage', oldLifeStage)
            // }
          // })
      // }
    // },
    setSex({ state, commit }, sex) {
      if (sex != null && sex.id != null) {
        sex.setValid({ isValid: true, message: null })
        commit('setSex', sex)
        commit('datacard/setSex', sex, { root: true })
      } else {
        let oldSex = state.datacard.getSex()
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
            commit('datacard/setSex', sex, { root: true })
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
    }
  }
}

export default speciesData
