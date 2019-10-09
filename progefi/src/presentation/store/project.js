const {
    ipcRenderer
} = require('electron')

const project = {
    namespaced: true,
    state: {
        projects: [{
            "name": 'Selecciona un proyecto'
        }]
    },
    mutations: {
        setProjects(state, projects) {
            state.projects = projects;
        }
    },
    actions: {
        getProjects({
            commit
        }) {
            ipcRenderer.send('getProjects')
            ipcRenderer.on('projects', (event, receivedProjects) => {
                commit('setProjects', receivedProjects)
            });
        }
    }
}

export default project;