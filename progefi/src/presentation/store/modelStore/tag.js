const {
  ipcRenderer
} = require('electron')
import Validator from '../../validators/validator'
var validator = new Validator()
import Vue from 'vue'
import Tag from '../../models/tag'

const tag = {
  namespaced: true,
  state: {
    createdTags: [],
    tags: [{ tag: "Nombre de la colección", tagName: "collection", placeholder: "<<colección>>" }, { tag: "Nombre del catálogo", tagName: "catalogue", placeholder: "<<catálogo>>" }],
    tag: new Tag(),
    requiredValues: {
      tagName: true,
      tagBefore: false,
      tagAfter: false,
      fontSize: true
    }
  },
  mutations: {
    setTagName(state, { tagName, isValid, message }) {
      state.tag.setTagNameValid({ isValid: isValid, message: message })
      state.tag.setTagName(null)
      state.tag.setTagName(tagName)
    },
    setTagBefore(state, { tagBefore, isValid, message }) {
      // debugger;
      state.tag.setTagBeforeValid({ isValid: isValid, message: message })
      state.tag.setTagBefore(null)
      state.tag.setTagBefore(tagBefore)
    },
    setTagAfter(state, { tagAfter, isValid, message }) {
      state.tag.setTagAfterValid({ isValid: isValid, message: message })
      state.tag.setTagAfter(null)
      state.tag.setTagAfter(tagAfter)
    },
    setFontSize(state, { fontSize, isValid, message }) {
      state.tag.setFontSizeValid({ isValid: isValid, message: message })
      state.tag.setFontSize(null)
      state.tag.setFontSize(fontSize)
    },
    setBold(state, isBold) {
      state.tag.setBold(isBold)
    },
    setItalics(state, isItalic) {
      state.tag.setItalics(isItalic)
    },
    setTextAlignment(state, textAlignment) {
      state.tag.setTextAlignment(textAlignment)
    }
  },
  actions: {
    setTagName({ state, commit }, tagName) {
      if (tagName != null) {
        commit('setTagName', { tagName, isValid: true, message: null })
        // var index = state.tags.find(x => x == tagName)
        // state.tags.splice(index, 1)
      } else {
        commit('setTagName', { tagName, isValid: false, message: "Campo requerido" })
      }
    },
    setTagBefore({ state, dispatch }, tagBefore) {
      let regex = '^[a-zA-Z0-9 :]*$'
      let testValue = tagBefore
      let oldValue = state.tag.getTagBefore()
      let testValueName = 'tagBefore'
      let minLimit = 1
      let maxLimit = 30
      let isRequired = state.requiredValues.tagBefore
      let mutationName = 'setTagBefore'
      let isOldValueValid = state.tag.isTagBeforeValid()

      dispatch('validate', {
        regex, oldValue, testValue, testValueName, minLimit, maxLimit, isRequired, mutationName, isOldValueValid
      })
    },
    setTagAfter({ state, dispatch }, tagAfter) {
      let regex = '^[a-zA-Z0-9 :]*$'
      let testValue = tagAfter
      let oldValue = state.tag.getTagBefore()
      let testValueName = 'tagAfter'
      let minLimit = 1
      let maxLimit = 30
      let isRequired = state.requiredValues.tagAfter
      let mutationName = 'setTagAfter'
      let isOldValueValid = state.tag.isTagAfterValid()

      dispatch('validate', {
        regex, oldValue, testValue, testValueName, minLimit, maxLimit, isRequired, mutationName, isOldValueValid
      })
    },
    setFontSize({ state, dispatch }, fontSize) {
      let regex = '^(([1-8][0-9]?|9[0-8]?)\.\d+|[1-9][0-9]?)$'
      let testValue = fontSize
      let oldValue = state.tag.getFontSize()
      let testValueName = 'fontSize'
      let minLimit = 1
      let maxLimit = 99
      let isRequired = state.requiredValues.fontSize
      let mutationName = 'setFontSize'
      let isOldValueValid = state.tag.isFontSizeValid()

      dispatch('validate', {
        regex, oldValue, testValue, testValueName, minLimit, maxLimit, isRequired, mutationName, isOldValueValid
      })
    },
    setBold({ commit }, isBold) {
      commit("setBold", isBold)
    },
    setItalics({ commit }, isItalic) {
      commit("setItalics", isItalic)
    },
    setTextAlignment({ commit }, textAlignment) {
      commit("setTextAlignment", textAlignment)
    },
    validate({ commit }, { regex, oldValue, testValue, testValueName, minLimit, maxLimit, isRequired,
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
    }
  }
}

export default tag