const { ipcRenderer } = require('electron')
import Vue from 'vue'
import Project from '../../models/project'

const project = {
  namespaced: true,
  state: {
    projects: [],
    project: new Project()
  },
  mutations: {
    setProjects(state, projects) {
      Vue.set(state, 'projects', projects)
    },
    setProject(state, project) {
      project.setValid({ isValid: true, message: null })
      Vue.set(state, 'project', project)
    },
    resetStore(state) {
      Vue.set(state, 'project', new Project())
    }
  },
  actions: {
    getProjects({ state, commit }) {
      // return new Promise((resolve, reject) => {
      ipcRenderer.send('getProjects')
      ipcRenderer.once('projects', (event, receivedProjects) => {
        let newProjects = []
        for (let i = 0; i < receivedProjects.length; i++) {
          let project = new Project()
          project.setProject(receivedProjects[i])
          newProjects.push(project)
        }
        commit('setProjects', newProjects)
        // Para ubicar el proyecto ya seleccionado dentro de la lista de proyectos
        // recuperados
        if (state.project.id != null) {
          let selectedProject = newProjects.find(
            x => x.id == state.project.getId()
          )
          commit('setProject', selectedProject)
        }
        // resolve();
      })
      // });
    },
    setProject({ commit }, project) {
      commit('setProject', project)
    },
  }
}

export default project
