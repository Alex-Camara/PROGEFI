import Validator from '../../../validators/validator'
var validator = new Validator()
import Datacard from '../../../models/datacard'
import Vue from 'vue'

const location = {
  namespaced: true,
  state: {
    datacard: new Datacard(),
    requiredValues: {
      country: true,
      countryState: true,
      municipality: true,
      locality: true
    }
  },
  mutations: {
    setDatacard(state, datacard) {
      Vue.set(state, 'datacard', datacard)
    },
    setCountry(state, { country, isValid, message }) {
      state.datacard.setCountryValid({ isValid: isValid, message: message })
      state.datacard.setCountry(null)
      state.datacard.setCountry(country)
    },
    setCountryState(state, { countryState, isValid, message }) {
      state.datacard.setCountryStateValid({
        isValid: isValid,
        message: message
      })
      state.datacard.setCountryState(null)
      state.datacard.setCountryState(countryState)
    },
    setMunicipality(state, { municipality, isValid, message }) {
      state.datacard.setMunicipalityValid({
        isValid: isValid,
        message: message
      })
      state.datacard.setMunicipality(null)
      state.datacard.setMunicipality(municipality)
    },
    setLocality(state, { locality, isValid, message }) {
      state.datacard.setLocalityValid({ isValid: isValid, message: message })
      state.datacard.setLocality(null)
      state.datacard.setLocality(locality)
    },
    resetStore(state) {
      Vue.set(state, 'datacard', new Datacard())
    }
  },
  actions: {
    setCountry({ state, dispatch }, country) {
      let regex = '^[^_{}+(),.;:!#$%&()\\[\\]=?¡+¿¡*|°@<>~¨^`¬\\d]+$'
      let testValue = country
      let oldValue = state.datacard.getCountry()
      let testValueName = 'country'
      let minLimit = 5
      let maxLimit = 50
      let isRequired = state.requiredValues.country
      let mutationName = 'setCountry'
      let isOldValueValid = state.datacard.isCountryValid()

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
    setCountryState({ state, dispatch }, countryState) {
      let regex = '^[^_{}+(),.;:!#$%&()\\[\\]=?¡+¿¡*|°@<>~¨^`¬\\d]+$'
      let testValue = countryState
      let oldValue = state.datacard.getCountryState()
      let testValueName = 'countryState'
      let minLimit = 5
      let maxLimit = 50
      let isRequired = state.requiredValues.countryState
      let mutationName = 'setCountryState'
      let isOldValueValid = state.datacard.isCountryStateValid()

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
    setMunicipality({ state, dispatch }, municipality) {
      let regex = '^[^_{}+(),.;:!#$%&()\\[\\]=?¡+¿¡*|°@<>~¨^`¬\\d]+$'
      let testValue = municipality
      let oldValue = state.datacard.getMunicipality()
      let testValueName = 'municipality'
      let minLimit = 2
      let maxLimit = 80
      let isRequired = state.requiredValues.municipality
      let mutationName = 'setMunicipality'
      let isOldValueValid = state.datacard.isMunicipalityValid()

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
    setLocality({ state, dispatch }, locality) {
      let regex = '^[^_{}+(),.;:!#$%&()\\[\\]=?¡+¿¡*|°@<>~¨^`¬\\d]+$'
      let testValue = locality
      let oldValue = state.datacard.getLocality()
      let testValueName = 'locality'
      let minLimit = 2
      let maxLimit = 80
      let isRequired = state.requiredValues.locality
      let mutationName = 'setLocality'
      let isOldValueValid = state.datacard.isLocalityValid()

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
    }
  }
}

export default location
