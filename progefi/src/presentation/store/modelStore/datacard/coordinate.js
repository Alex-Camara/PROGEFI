import Validator from '../../../validators/validator'
var validator = new Validator()
import Datacard from '../../../models/datacard'
import Vue from 'vue'

const coordinate = {
  namespaced: true,
  state: {
    datacard: new Datacard(),
    requiredValues: {
      longitude: true,
      latitude: true,
      altitude: true
    }
  },
  mutations: {
    setDatacard(state, datacard) {
      Vue.set(state, 'datacard', datacard)
    },
    setLongitude(state, {
      longitude,
      isValid,
      message
    }) {
      state.datacard.setLongitudeValid({
        isValid: isValid,
        message: message
      })
      state.datacard.setLongitude(null)
      state.datacard.setLongitude(longitude)
    },
    setLatitude(state, {
      latitude,
      isValid,
      message
    }) {
      state.datacard.setLatitudeValid({
        isValid: isValid,
        message: message
      })
      state.datacard.setLatitude(null)
      state.datacard.setLatitude(latitude)
    },
    setAltitude(state, {
      altitude,
      isValid,
      message
    }) {
      state.datacard.setAltitudeValid({
        isValid: isValid,
        message: message
      })
      state.datacard.setAltitude(null)
      state.datacard.setAltitude(altitude)
    },
    setRequiredLongitude(state, required) {
      state.longitude.required = required
    },
    setRequiredLatitude(state, required) {
      state.latitude.required = required
    },
    setRequiredAltitude(state, required) {
      state.altitude.required = required
    },
    resetStore(state) {
      Vue.set(state, 'datacard', new Location())
    }
  },
  actions: {
    setLongitude({
      state,
      dispatch
    }, longitude) {
      let testValue = longitude
      let oldValue = state.datacard.getLongitude()
      let testValueName = 'longitude'
      let minLimit = -180
      let maxLimit = 180
      let decimalMaxLimit = 999999
      let isRequired = state.requiredValues.longitude
      let mutationName = 'setLongitude'

      dispatch('validate', {
        oldValue,
        testValue,
        testValueName,
        minLimit,
        maxLimit,
        isRequired,
        mutationName,
        decimalMaxLimit
      })
    },
    setLatitude({
      state,
      dispatch
    }, latitude) {
      let testValue = latitude
      let oldValue = state.datacard.getLatitude()
      let testValueName = 'latitude'
      let minLimit = -180
      let maxLimit = 180
      let decimalMaxLimit = 999999
      let isRequired = state.requiredValues.latitude
      let mutationName = 'setLatitude'

      dispatch('validate', {
        oldValue,
        testValue,
        testValueName,
        minLimit,
        maxLimit,
        isRequired,
        mutationName,
        decimalMaxLimit
      })
    },
    setAltitude({
      state,
      dispatch
    }, altitude) {
      let testValue = altitude
      let oldValue = state.datacard.getAltitude()
      let testValueName = 'altitude'
      let minLimit = -100
      let maxLimit = 8000
      let decimalMaxLimit = 999999
      let isRequired = state.requiredValues.altitude
      let mutationName = 'setAltitude'

      dispatch('validate', {
        oldValue,
        testValue,
        testValueName,
        minLimit,
        maxLimit,
        isRequired,
        mutationName,
        decimalMaxLimit
      })
    },
    // FIXME el signo de menos es detectado bien la primera vez, pero las siguientes no
    validate({
      commit
    }, {
      oldValue,
      testValue,
      testValueName,
      minLimit,
      maxLimit,
      isRequired,
      mutationName,
      decimalMaxLimit
    }) {
      validator
        .testValidationTwo(
          testValue,
          minLimit,
          maxLimit,
          decimalMaxLimit,
          isRequired
        )
        .then(() => {
          // debugger
          commit(mutationName, {
            [testValueName]: testValue,
            isValid: true,
            message: null
          })
          commit('datacard/' + mutationName, testValue, {
            root: true
          })
        })
        .catch(error => {
          //debugger
          // cuando el campo es requerido y esta vacío
          if (error == 'Campo requerido') {
            commit(mutationName, {
              [testValueName]: testValue,
              isValid: false,
              message: error
            })
            // cuando el campo esta vacío, pero no es error porque el campo no es requerido
          } else if (error == 'Campo vacío') {
            commit(mutationName, {
              [testValueName]: testValue,
              isValid: true,
              message: 'temporary error'
            })
            // cuando solo se ha ingresado un - para un número negativo
          } else if (error == 'Ingresa un número') {
            commit(mutationName, {
              [testValueName]: testValue,
              isValid: false,
              message: error
            })
            // cuando hubo un error y solo se informa, no se refleja en el estado
          } else if (oldValue == '' && isRequired) {
            commit(mutationName, {
              [testValueName]: oldValue,
              isValid: false,
              message: error
            })
            // cuando hubo un error y solo se informa, no se refleja en el estado
          } else {
            commit(mutationName, {
              [testValueName]: oldValue,
              isValid: true,
              message: 'temporary error'
            })
          }
        })
    }
  }
}

export default coordinate