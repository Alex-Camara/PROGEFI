const { ipcRenderer } = require('electron')

const template = {
  namespaced: true,
  state: {
    templates: [],
    template: {},
    fontSizes: [],
    tagColors: []
  },
  mutations: {
    setTemplates (state, templates) {
      console.info(templates)
      state.templates = templates
    },
    setTemplate (state, template) {
      console.info(template)
      state.template = template
    },
    setFontSize (state, template) {
      for (let i = 0; i < template.layout.length; i++) {
        const element = template.layout[i].style
        let size = element['font-size']
        state.fontSizes[i] = size
        //debugger;
      }
    },
    setTagColors (state, template) {
      for (let i = 0; i < template.layout.length; i++) {
        const element = template.layout[i].style
        let tagColor = element['background-color']
        state.tagColors[i] = tagColor
        //debugger;
      }
    }
  },
  actions: {
    getTemplates ({ commit, dispatch }) {
      ipcRenderer.send('getTemplates')
      ipcRenderer.on('templates', (event, receivedTemplates) => {
        commit('setTemplates', receivedTemplates)
        //seleccionar por default la primera plantilla
        dispatch('getTemplate', receivedTemplates[0].id)
      })
    },
    getTemplate ({ commit, dispatch }, templateId) {
      ipcRenderer.send('getTemplate', templateId)
      ipcRenderer.on('template', (event, receivedTemplate) => {
        commit('setTemplate', receivedTemplate)
        commit('setFontSize', receivedTemplate)
        commit('setTagColors', receivedTemplate)
        dispatch('setRequiredFields', receivedTemplate.tags)
      })
    },
    setRequiredFields ({ dispatch }, tags) {
      dispatch('device/setRequiredValues', tags, { root: true })
      dispatch('collector/setRequiredValues', tags, { root: true })
      dispatch('coordinate/setRequiredValues', tags, { root: true })
      dispatch('speciesData/setRequiredValues', tags, { root: true })
      dispatch('location/setRequiredValues', tags, { root: true })
      dispatch('climateType/setRequiredValues', tags, { root: true })
      dispatch('vegetationType/setRequiredValues', tags, { root: true })
    }
  }
}

export default template
