const {
    ipcRenderer
} = require('electron')

const project = {
    namespaced: true,
    state: {
        projects: [],
        project: {
            name: null
        }
    },
    mutations: {
        setProjects(state, projects) {
            state.projects = projects;
        },
        setProject(state, project) {
            state.project = project;
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