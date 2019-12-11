const {
    ipcRenderer
} = require('electron')

const template = {
    namespaced: true,
    state: {
        templates: [],
        template: {}
    },
    mutations: {
        setTemplates(state, templates) {
            state.templates = templates;
        },
        setTemplate(state, template) {
            state.template = template;
        }/*,
        setTagColors(state, template) {
            for (let i = 0; i < state.layout.length; i++) {
                state.template.tagColors = state.layout[i].style["background-color"];
            }
        },*/
    },
    actions: {
        getTemplates({ commit, dispatch }) {
            ipcRenderer.send('getTemplates')
            ipcRenderer.on('templates', (event, receivedTemplates) => {
                commit('setTemplates', receivedTemplates)
                //seleccionar por default la primera plantilla
                dispatch('getTemplate', receivedTemplates[0].id)
            });
        },
        getTemplate({ commit, dispatch }, templateId) {
            ipcRenderer.send('getTemplate', templateId)
            ipcRenderer.on('template', (event, receivedTemplate) => {
                commit('setTemplate', receivedTemplate)
                dispatch('setRequiredFields', receivedTemplate.tags)
            });
        },
        setRequiredFields({dispatch}, tags){
            dispatch("device/setRequiredValues", tags, { root: true });
            dispatch("collector/setRequiredValues", tags, { root: true });
            dispatch("coordinate/setRequiredValues", tags, { root: true });
            dispatch("speciesData/setRequiredValues", tags, { root: true });
            dispatch("location/setRequiredValues", tags, { root: true });
            dispatch("climateType/setRequiredValues", tags, { root: true });
            dispatch("vegetationType/setRequiredValues", tags, { root: true });
        }
    }
}

export default template;