import Validator from '../validators/validator'
var validator = new Validator()

const location = {
  namespaced: true,
  state: {
    country: {
      name: null,
      required: false,
      valid: {
        isValid: true,
        message: null
      }
    },
    countryState: {
      name: null,
      required: false,
      valid: {
        isValid: true,
        message: null
      }
    },
    municipality: {
      name: null,
      required: false,
      valid: {
        isValid: true,
        message: null
      }
    },
    locality: {
      name: null,
      required: false,
      valid: {
        isValid: true,
        message: null
      }
    }
  },
  mutations: {
    setCountry (state, country) {
      // //debugger;
      country.required = state.country.required
      state.country = country
    },
    setCountryState (state, countryState) {
      // //debugger;
      countryState.required = state.countryState.required
      state.countryState = countryState
    },
    setMunicipality (state, municipality) {
      municipality.required = state.municipality.required
      state.municipality = municipality
    },
    setLocality (state, locality) {
      locality.required = state.locality.required
      state.locality = locality
    },
    setRequiredValue (state, {required: required, valueName}) {
      state[valueName].required = required
    }
  },
  actions: {
    setCountry ({ dispatch }, country) {
      country = { name: country, valid: null }
      let regex = '^[^_{}+(),.;:!#$%&()\\[\\]=?¡+¿¡*|°@<>~¨^`¬\\d]+$'

      dispatch('validate', {
        testValueName: 'country',
        testValue: country,
        mutationName: 'setCountry',
        minLimit: 2,
        maxLimit: 50,
        regex: regex
      })
    },
    setCountryState ({ dispatch }, countryState) {
      // //debugger;
      countryState = { name: countryState }
      let regex = '^[^_{}+(),.;:!#$%&/()\\[\\]=?¡+¿¡*|°@<>~¨^`¬\\d]+$'

      dispatch('validate', {
        testValueName: 'countryState',
        testValue: countryState,
        mutationName: 'setCountryState',
        minLimit: 2,
        maxLimit: 50,
        regex: regex
      })
    },
    setMunicipality ({ dispatch }, municipality) {
      if (municipality === undefined) {
        municipality = { name: null }
      } else {
        municipality = { name: municipality }
      }
      // //debugger;
      let regex = '^[^_{}+(),.;:!#$%&/()\\[\\]=?¡+¿¡*|°@<>~¨^`¬\\d]+$'

      dispatch('validate', {
        testValueName: 'municipality',
        testValue: municipality,
        mutationName: 'setMunicipality',
        minLimit: 2,
        maxLimit: 80,
        regex: regex
      })
    },
    setLocality ({ dispatch  }, locality) {
      if (locality === undefined) {
        locality = { name: null }
      } else {
        locality = { name: locality }
      }
      let regex = '^[^_{}+(),.;:!#$%&/()\\[\\]=?¡+¿¡*|°@<>~¨^`¬\\d]+$'

      dispatch('validate', {
        testValueName: 'locality',
        testValue: locality,
        mutationName: 'setLocality',
        minLimit: 2,
        maxLimit: 80,
        regex: regex
      })
    },
    validate ({ state, commit }, { testValueName, testValue, mutationName, minLimit, maxLimit, regex }) {
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
    setRequiredValues ({ commit }, tags) {
      let localTags = [
        'country',
        'countryState',
        'municipality',
        'locality'
      ]
      for (let i = 0; i < localTags.length; i++) {
        const element = localTags[i]
        let foundTag = tags.filter(obj => {
          return obj.tag === element
        })

        if (foundTag.length > 0) {
          commit('setRequiredValue', {valueName: element,required: true})
        } else {
          commit('setRequiredValue', {valueName: element,required: false})
        }
      }
    }
  }
}

export default location
