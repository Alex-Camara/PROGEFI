import Validator from '../validators/validator'
var validator = new Validator()

const coordinate = {
  namespaced: true,
  state: {
    longitude: {
      value: -101.433236,
      required: false,
      valid: {
        isValid: true,
        message: null
      }
    },
    latitude: {
      value: 20.102365,
      required: false,
      valid: {
        isValid: true,
        message: null
      }
    },
    altitude: {
      value: null,
      required: false,
      valid: {
        isValid: true,
        message: null
      }
    }
  },
  mutations: {
    setLongitude (state, longitude) {
      longitude.required = state.longitude.required
      state.longitude = longitude
    },
    setLatitude (state, latitude) {
      latitude.required = state.latitude.required
      state.latitude = latitude
    },
    setAltitude (state, altitude) {
      altitude.required = state.altitude.required
      state.altitude = altitude
    },
    setRequiredLongitude (state, required) {
      state.longitude.required = required
    },
    setRequiredLatitude (state, required) {
      state.latitude.required = required
    },
    setRequiredAltitude (state, required) {
      state.altitude.required = required
    },
    restoreMetadataValue (state, { attribute, metadataValue }) {
      state[attribute] = metadataValue
    }
  },
  actions: {
    setLongitude ({ dispatch }, longitude) {
      longitude = { value: longitude }
      dispatch('validate', {
        testValueName: 'longitude',
        testValue: longitude,
        mutationName: 'setLongitude',
        minLimit: -180,
        maxLimit: 180,
        decimalMaxLimit: 999999
      })
      /* validator
        .testValidationTwo(longitude.value, -180, 180, 999999, state.longitude.required)
        .then(() => {
          longitude.valid = { isValid: true, message: null }
          commit('setLongitude', longitude)
        })
        .catch(error => {
          if (error == 'Campo requerido') {
            longitude.valid = { isValid: true, message: null }
            longitude.value = 0
            commit('setLongitude', longitude)
          } else if (error == 'Ingresa un número') {
            longitude.valid = { isValid: false, message: error }
            commit('setLongitude', longitude)
          } else {
            state.longitude.valid = { isValid: true, message: 'temporary error' }
            commit('setLongitude', state.longitude)
          }
        }) */
    },
    setLatitude ({ dispatch }, latitude) {
      latitude = { value: latitude };
      dispatch('validate', {
        testValueName: 'latitude',
        testValue: latitude,
        mutationName: 'setLatitude',
        minLimit: -180,
        maxLimit: 180,
        decimalMaxLimit: 999999
      })
      /*validator
        .testValidationTwo(latitude.value, -180, 180, 999999, state.latitude.required)
        .then(() => {
          latitude.valid = { isValid: true, message: null }
          commit('setLatitude', latitude)
        })
        .catch(error => {
          if (error == 'Campo requerido') {
            latitude.valid = { isValid: true, message: null }
            latitude.value = 0
            commit('setLatitude', latitude)
          } else if (error == 'Ingresa un número') {
            latitude.valid = { isValid: false, message: error }
            commit('setLatitude', latitude)
          } else {
            state.latitude.valid = { isValid: true, message: 'temporary error' }
            commit('setLatitude', state.latitude)
          }
        })*/
    },
    setAltitude ({ dispatch }, altitude) {
      altitude = { value: altitude };
      dispatch('validate', {
        testValueName: 'altitude',
        testValue: altitude,
        mutationName: 'setAltitude',
        minLimit: -100,
        maxLimit: 8000,
        decimalMaxLimit: 999999
      })
      /*validator
        .testValidationTwo(altitude.value, -100, 8000, 999999, state.altitude.required)
        .then(() => {
          // debugger
          altitude.valid = { isValid: true, message: null }
          commit('setAltitude', altitude)
        })
        .catch(error => {
          // debugger
          // cuando el campo es requerido y esta vacío
          if (error == 'Campo requerido') {
            altitude.valid = { isValid: false, message: error }
            commit('setAltitude', altitude)
            // cuando el campo esta vacío, pero no es error porque el campo no es requerido
          } else if (error == 'Campo vacío') {
            altitude.valid = { isValid: true, message: 'temporary error' }
            commit('setAltitude', altitude)
            // cuando solo se ha ingresado un - para un número negativo
          } else if (error == 'Ingresa un número') {
            altitude.valid = { isValid: false, message: error }
            commit('setAltitude', altitude)
            // cuando hubo un error y solo se informa, no se refleja en el estado
          } else if (state.altitude.value == '' && state.altitude.required) {
            state.altitude.valid = { isValid: false, message: error }
            commit('setAltitude', state.altitude)
            // cuando hubo un error y solo se informa, no se refleja en el estado
          } else {
            state.altitude.valid = { isValid: true, message: 'temporary error' }
            commit('setAltitude', state.altitude)
          }
        })*/
    },
    validate ({ state, commit }, { testValueName, testValue, mutationName, minLimit, maxLimit, decimalMaxLimit }) {
      validator
        .testValidationTwo(testValue.value, minLimit, maxLimit, decimalMaxLimit, state[testValueName].required)
        .then(() => {
          // debugger
          testValue.valid = { isValid: true, message: null }
          commit(mutationName, testValue)
        })
        .catch(error => {
          // debugger
          // cuando el campo es requerido y esta vacío
          if (error == 'Campo requerido') {
            testValue.valid = { isValid: false, message: error }
            commit(mutationName, testValue)
            // cuando el campo esta vacío, pero no es error porque el campo no es requerido
          } else if (error == 'Campo vacío') {
            testValue.valid = { isValid: true, message: 'temporary error' }
            commit(mutationName, testValue)
            // cuando solo se ha ingresado un - para un número negativo
          } else if (error == 'Ingresa un número') {
            testValue.valid = { isValid: false, message: error }
            commit(mutationName, testValue)
            // cuando hubo un error y solo se informa, no se refleja en el estado
          } else if (state[testValueName].value == '' && state[testValueName].required) {
            state[testValueName].valid = { isValid: false, message: error }
            commit(mutationName, state.testValue)
            // cuando hubo un error y solo se informa, no se refleja en el estado
          } else {
            state[testValueName].valid = { isValid: true, message: 'temporary error' }
            commit(mutationName, state[testValueName])
          }
        })
    },
    setRequiredValues ({ state, commit, dispatch }, tags) {
      let foundLongitudeTag = tags.filter(obj => {
        return obj.tag === 'longitude'
      })
      let foundLatitudeTag = tags.filter(obj => {
        return obj.tag === 'latitude'
      })
      let foundAltitudeTag = tags.filter(obj => {
        return obj.tag === 'altitude'
      })

      if (foundLongitudeTag) {
        commit('setRequiredLongitude', true)
        dispatch('setLongitude', state.longitude.value)
      } else {
        commit('setRequiredLongitude', false)
        dispatch('setLongitude', state.longitude.value)
      }
      if (foundLatitudeTag) {
        commit('setRequiredLatitude', true)
        dispatch('setLatitude', state.latitude.value)
      } else {
        commit('setRequiredLatitude', false)
        dispatch('setLatitude', state.latitude.value)
      }
      if (foundAltitudeTag) {
        commit('setRequiredAltitude', true)
        dispatch('setAltitude', state.altitude.value)
      } else {
        commit('setRequiredAltitude', false)
        dispatch('setAltitude', state.altitude.value)
      }
    }
  }
}

export default coordinate
