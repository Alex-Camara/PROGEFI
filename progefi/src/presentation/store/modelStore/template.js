const {
  ipcRenderer
} = require('electron')
import Vue from 'vue'
import Template from '../../models/template'

const template = {
  namespaced: true,
  state: {
    templates: [],
    template: new Template(),
    fontSizes: [],
    tagColors: []
  },
  mutations: {
    setTemplates(state, templates) {
      Vue.set(state, 'templates', templates)
    },
    setTemplate(state, template) {
      Vue.set(state, 'template', template)
    },
    setFontSize(state, template) {
      for (let i = 0; i < template.layout.length; i++) {
        const element = template.layout[i].style
        let size = element['font-size']
        state.fontSizes[i] = size
        //debugger;
      }
    },
    setTagColors(state, template) {
      for (let i = 0; i < template.layout.length; i++) {
        const element = template.layout[i].style
        let tagColor = element['background-color']
        state.tagColors[i] = tagColor
        //debugger;
      }
    }
  },
  actions: {
    getTemplates({
      commit,
      dispatch
    }) {
      ipcRenderer.send('getTemplates')
      ipcRenderer.once('templates', (event, receivedTemplates) => {
        let newTemplates = []
        for (let i = 0; i < receivedTemplates.length; i++) {
          let template = new Template()
          template.setTemplate(receivedTemplates[i])
          newTemplates.push(template)
        }
        commit('setTemplates', newTemplates)
        //seleccionar por default la primera plantilla
        dispatch('getTemplate', newTemplates[0])
      })
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
    }
  }
}

export default template