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
    setProjects (state, projects) {
      Vue.set(state, 'projects', projects)
    },
    setProject (state, project) {
      project.setValid({ isValid: true, message: null })
      Vue.set(state, 'project', project)
    },
    resetStore (state) {
      Vue.set(state, 'project', new Project())
    }
  },
  actions: {
    getProjects ({ commit }) {
      ipcRenderer.send('getProjects')
      ipcRenderer.on('projects', (event, receivedProjects) => {
        let newProjects = []
        for (let i = 0; i < receivedProjects.length; i++) {
          let project = new Project()
          project.setProject(receivedProjects[i])
          newProjects.push(project)
        }
        commit('setProjects', newProjects)
      })
    }
  }
}

export default project
