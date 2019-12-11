import Validator from '../validators/validator'
var validator = new Validator()

const modal = {
  namespaced: true,
  state: {
    active: false,
    title: '',
    fieldText: '',
    mutationName: null,
    required: true,
    regex: null,
    minLimit: null,
    maxLimit: null,
    modalValue: {
      valueName: null,
      value: null,
      valid: {
        isValid: false,
        message: null
      }
    }
  },
  mutations: {
    setActive (state, value) {
      state.active = value
    },
    setTitle (state, title) {
      state.title = title
    },
    setFieldText (state, fieldText) {
      state.fieldText = fieldText
    },
    setRegex (state, regex) {
      state.regex = regex
    },
    setModalValue (state, modalValue) {
      state.modalValue = null
      state.modalValue = modalValue
      // debugger
    },
    setLimitValues (state, { minLimit, maxLimit }) {
      state.minLimit = minLimit
      state.maxLimit = maxLimit
    },
    setMutationName (state, mutationName) {
      state.mutationName = mutationName
    }
  },
  actions: {
    openModal ({ commit }, { title, fieldText, mutationName, valueName, regex, minLimit, maxLimit }) {
      commit('setActive', true)
      commit('setTitle', title)
      commit('setFieldText', fieldText)
      commit('setMutationName', mutationName)
      commit('setRegex', regex)
      commit('setLimitValues', { minLimit, maxLimit })
      let modalValue = { value: null, valueName: valueName, valid: { isValid: false, message: null } }

      commit('setModalValue', modalValue)
    },
    closeModal ({ commit }) {
      commit('setActive', false)
    },
    setValue ({ state, dispatch }, value) {
      let modalValue = { value: value, valueName: state.modalValue.valueName, valid: null }
      dispatch('validate', { testValue: modalValue })
      // commit('setModalValue', value)
    },
    saveValue ({ state, dispatch }) {
      let sendingValue = state.modalValue.value
      if (state.modalValue.valueName != null) {
        let keyName = state.modalValue.valueName
        sendingValue = {
          [keyName]: state.modalValue.value
        }
      }

      dispatch(state.mutationName, sendingValue, { root: true })
      dispatch('resetModal')
    },
    resetModal ({ commit }) {
      commit('setTitle', null)
      commit('setFieldText', null)
      commit('setMutationName', null)
      commit('setRegex', null)
      commit('setLimitValues', {minLimit: null, maxLimit: null})
      // commit('setModalValue', null)
    },
    validate ({ state, commit }, { testValue }) {
      validator
        .testValidationOne(testValue.value, state.minLimit, state.maxLimit, state.required, state.regex)
        .then(() => {
          // debugger
          testValue.valid = { isValid: true, message: null }
          commit('setModalValue', testValue)
        })
        .catch(error => {
          // debugger
          if (error == 'Campo requerido') {
            testValue.valid = { isValid: false, message: error }
            commit('setModalValue', testValue)
          } else if (error == 'Longitud mínima invalida') {
            testValue.valid = { isValid: false, message: error }
            commit('setModalValue', testValue)
          } else if (error == 'Campo vacío') {
            testValue.valid = { isValid: true, message: 'temporary error' }
            commit('setModalValue', testValue)
          } else if (state.modalValue.valid.isValid) {
            // debugger
            state.modalValue.valid = { isValid: true, message: 'temporary error' }
            commit('setModalValue', state.modalValue)
          } else {
            // debugger
            state.modalValue.valid = { isValid: false, message: error }
            commit('setModalValue', state.modalValue)
          }
        })
    }
  }
}

export default modal
