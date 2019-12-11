const { ipcRenderer } = require('electron')

const project = {
  namespaced: true,
  state: {
    projects: [],
    project: {
      name: null,
      required: true,
      valid: {
        isValid: false,
        message: "campo requerido"
      }
    }
  },
  mutations: {
    setProjects (state, projects) {
      projects.push({name: 'No aplica (N/A)'})
      state.projects = projects
    },
    setProject (state, project) {
      project.required = state.project.required;
      project.valid = { isValid: true, message: null }
      state.project = project
    }
  },
  actions: {
    getProjects ({ commit }) {
      ipcRenderer.send('getProjects')
      ipcRenderer.on('projects', (event, receivedProjects) => {
        commit('setProjects', receivedProjects)
      })
    }
  }
}

export default project
