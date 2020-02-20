import Validator from '../../validators/validator'
var validator = new Validator()
import Location from '../../models/location'
import Vue from 'vue'

const location = {
  namespaced: true,
  state: {
    location: new Location(),
    requiredValues: {
      country: true,
      countryState: true,
      municipality: true,
      locality: true
    }
  },
  mutations: {
    setLocation (state, location) {
      Vue.set(state, 'location', location)
    },
    setCountry (state, { country, isValid, message }) {
      state.location.setCountryValid({ isValid: isValid, message: message })
      state.location.setCountry(null)
      state.location.setCountry(country)
    },
    setCountryState (state, { countryState, isValid, message }) {
      state.location.setCountryStateValid({
        isValid: isValid,
        message: message
      })
      state.location.setCountryState(null)
      state.location.setCountryState(countryState)
    },
    setMunicipality (state, { municipality, isValid, message }) {
      state.location.setMunicipalityValid({
        isValid: isValid,
        message: message
      })
      state.location.setMunicipality(null)
      state.location.setMunicipality(municipality)
    },
    setLocality (state, { locality, isValid, message }) {
      state.location.setLocalityValid({ isValid: isValid, message: message })
      state.location.setLocality(null)
      state.location.setLocality(locality)
    },
    resetStore (state) {
      Vue.set(state, 'location', new Location())
    }
  },
  actions: {
    setCountry ({ state, dispatch }, country) {
      let regex = '^[^_{}+(),.;:!#$%&()\\[\\]=?¡+¿¡*|°@<>~¨^`¬\\d]+$'
      let testValue = country
      let oldValue = state.location.getCountry()
      let testValueName = 'country'
      let minLimit = 5
      let maxLimit = 50
      let isRequired = state.requiredValues.country
      let mutationName = 'setCountry'
      let isOldValueValid = state.location.isCountryValid()

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
    setCountryState ({ state, dispatch }, countryState) {
      let regex = '^[^_{}+(),.;:!#$%&()\\[\\]=?¡+¿¡*|°@<>~¨^`¬\\d]+$'
      let testValue = countryState
      let oldValue = state.location.getCountryState()
      let testValueName = 'countryState'
      let minLimit = 5
      let maxLimit = 50
      let isRequired = state.requiredValues.countryState
      let mutationName = 'setCountryState'
      let isOldValueValid = state.location.isCountryStateValid()

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
    setMunicipality ({ state, dispatch }, municipality) {
      let regex = '^[^_{}+(),.;:!#$%&()\\[\\]=?¡+¿¡*|°@<>~¨^`¬\\d]+$'
      let testValue = municipality
      let oldValue = state.location.getMunicipality()
      let testValueName = 'municipality'
      let minLimit = 2
      let maxLimit = 80
      let isRequired = state.requiredValues.municipality
      let mutationName = 'setMunicipality'
      let isOldValueValid = state.location.isMunicipalityValid()

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
    setLocality ({ state, dispatch }, locality) {
      let regex = '^[^_{}+(),.;:!#$%&()\\[\\]=?¡+¿¡*|°@<>~¨^`¬\\d]+$'
      let testValue = locality
      let oldValue = state.location.getLocality()
      let testValueName = 'locality'
      let minLimit = 2
      let maxLimit = 80
      let isRequired = state.requiredValues.locality
      let mutationName = 'setLocality'
      let isOldValueValid = state.location.isLocalityValid()

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
