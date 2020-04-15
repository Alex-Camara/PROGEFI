const {
  ipcRenderer
} = require('electron')
import Validator from '../../validators/validator'
var validator = new Validator()
import Vue from 'vue'
import Template from '../../models/template'
import Tag from '../../models/tag'

const template = {
  namespaced: true,
  state: {
    templates: [],
    template: new Template(),
    fontSizes: [],
    fonts: [],
    fontFamilies: [],
    tagColors: [],
    tag: new Tag(),
    requiredValues: {
      name: true,
      backgroundColor: true,
      fontColor: true,
      fontFamily: true,
      tagName: true,
      tagBefore: false,
      tagAfter: false
    }
  },
  mutations: {
    setTemplates(state, templates) {
      Vue.set(state, 'templates', templates)
    },
    setTemplate(state, template) {
      Vue.set(state, 'template', template)
    },
    setName(state, { name, isValid, message }) {
      state.template.setNameValid({ isValid: isValid, message: message })
      state.template.setName(null)
      state.template.setName(name)
    },
    setBackgroundColor(state, { backgroundColor, isValid, message }) {
      state.template.setBackgroundColorValid({ isValid: isValid, message: message })
      state.template.setBackgroundColor(null)
      state.template.setBackgroundColor(backgroundColor)
    },
    setFontColor(state, { fontColor, isValid, message }) {
      state.template.setFontColorValid({ isValid: isValid, message: message })
      state.template.setFontColor(null)
      state.template.setFontColor(fontColor)
    },
    setFontFamily(state, { fontFamily, isValid, message }) {
      state.template.setFontFamilyValid({ isValid: isValid, message: message })
      state.template.setFontFamily(null)
      state.template.setFontFamily(fontFamily)
    },
    setTagName(state, { tagName, isValid, message }) {
      state.tag.setTagNameValid({ isValid: isValid, message: message })
      state.tag.setTagName(null)
      state.tag.setTagName(tagName)
    },
    setTagBefore(state, { tagBefore, isValid, message }) {
      state.tag.setTagNameValid({ isValid: isValid, message: message })
      state.tag.setTagName(null)
      state.tag.setTagName(tagBefore)
    },
    setTagAfter(state, { tagAfter, isValid, message }) {
      state.tag.setTagNameValid({ isValid: isValid, message: message })
      state.tag.setTagName(null)
      state.tag.setTagName(tagAfter)
    },
    setFontFamilies(state, fontFamilies) {
      state.fontFamilies = fontFamilies
    },
    setFonts(state, fonts) {
      state.fonts = fonts
    },
    setFontSize(state, template) {
      for (let i = 0; i < template.tags.length; i++) {
        // debugger;
        const element = template.tags[i].style
        let size = element['font-size']
        state.fontSizes[i] = size
        //debugger;
      }
    },
    setTagColors(state, template) {
      for (let i = 0; i < template.tags.length; i++) {
        const element = template.tags[i].style
        let tagColor = element['background-color']
        state.tagColors[i] = tagColor
        //debugger;
      }
    },
    resetStore(state) {
      Vue.set(state, 'template', new Template())
    }
  },
  actions: {
    getTemplates({ commit }) {
      return new Promise((resolve) => {
        ipcRenderer.send('getTemplates')
        ipcRenderer.once('templates', (event, receivedTemplates) => {
          let newTemplates = []
          for (let i = 0; i < receivedTemplates.length; i++) {
            let template = new Template()
            template.setTemplate(receivedTemplates[i])
            newTemplates.push(template)
          }
          commit('setTemplates', newTemplates)
          resolve(newTemplates)
        })
      });
    },
    getFonts({ commit }) {
      return new Promise((resolve) => {
        ipcRenderer.send('getFonts')
        ipcRenderer.once('fonts', (event, receivedFonts) => {
          // debugger;
          commit('setFonts', receivedFonts)
          let fontFamilies = []
          for (let i = 0; i < receivedFonts.length; i++) {
            let family = receivedFonts[i].family
            let foundFamily = fontFamilies.find(x => x == family)
            if (!foundFamily) {
              fontFamilies.push(family)
            }
            // debugger;
          }
          commit('setFontFamilies', fontFamilies)
          // debugger;
          resolve(fontFamilies)
        })
      });
    },
    getTemplate({
      commit
    }, template) {
      ipcRenderer.send('getTemplate', template.getId())
      ipcRenderer.once('template', (event, receivedTemplate) => {
        // debugger;
        // let fullTemplate = new Template()
        // template.setTemplate(receivedTemplate)
        template.setTags(receivedTemplate.tags)
        template.setLayout(receivedTemplate.layout)
        commit('setFontSize', receivedTemplate)
        commit('setTagColors', receivedTemplate)
        commit('setTemplate', template)

      })
    },
    setName({ state, commit, dispatch }, name) {
      let foundTemplateName = state.templates.find(x => x.name == name)
      if (foundTemplateName) {
        commit('setName', { name: name, isValid: false, message: "Nombre ya en uso" })
      } else {
        let regex = '^[a-zA-Z0-9 \\u00C0-\\u00FF /():_-]*$'
        let testValue = name
        let oldValue = state.template.getName()
        let testValueName = 'name'
        let minLimit = 5
        let maxLimit = 50
        let isRequired = state.requiredValues.name
        let mutationName = 'setName'
        let isOldValueValid = state.template.isNameValid()

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
      }
    },
    setBackgroundColor({ state, dispatch }, backgroundColor) {
      let regex = '^[a-zA-Z0-9 #]*$'
      let testValue = backgroundColor
      let oldValue = state.template.getBackgroundColor()
      let testValueName = 'backgroundColor'
      let minLimit = 7
      let maxLimit = 7
      let isRequired = state.requiredValues.backgroundColor
      let mutationName = 'setBackgroundColor'
      let isOldValueValid = state.template.isBackgroundColorValid()

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
    setFontColor({ state, dispatch }, fontColor) {
      let regex = '^[a-zA-Z0-9 #]*$'
      let testValue = fontColor
      let oldValue = state.template.getFontColor()
      let testValueName = 'fontColor'
      let minLimit = 7
      let maxLimit = 7
      let isRequired = state.requiredValues.fontColor
      let mutationName = 'setFontColor'
      let isOldValueValid = state.template.isFontColorValid()

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
    setFontFamily({ state, commit }, fontFamily) {
      let foundFamily = state.fontFamilies.find(x => x == fontFamily)
      if (foundFamily) {
        commit('setFontFamily', { fontFamily, isValid: true, message: null })
      } else {
        if (fontFamily == "") {
          commit('setFontFamily', { fontFamily, isValid: false, message: "Campo requerido" })
        } else {
          commit('setFontFamily', { fontFamily, isValid: false, message: "Fuente no válida" })
        }
      }
    },
    setTagName({ state, commit }, tagName) {
      let foundTagName = state.template.tags.find(x => x.tagName == tagName)
      if (foundTagName) {
        commit('setTagName', { tagName, isValid: true, message: null })
      } else {
        if (tagName == "") {
          commit('setTagName', { tagName, isValid: false, message: "Campo requerido" })
        } else {
          commit('setTagName', { tagName, isValid: false, message: "Etiqueta no válida" })
        }
      }
    },
    setTagBefore({ state, dispatch }, tagBefore) {
      let regex = '^[a-zA-Z0-9 #]*$'
      let testValue = tagBefore
      let oldValue = state.tag.getTagBefore()
      let testValueName = 'tagBefore'
      let minLimit = 1
      let maxLimit = 30
      let isRequired = state.requiredValues.tagBefore
      let mutationName = 'setTagBefore'
      let isOldValueValid = state.tag.isTagBeforeValid()

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
  }
}

export default template