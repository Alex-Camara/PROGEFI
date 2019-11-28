const {
    ipcRenderer
} = require('electron')

const curator = {
    namespaced: true,
    state: {
        curators: [],
        selectedCurators: [],
        selectedCurator: {
            name: null
        },
        selectedCuratorsName: ''
    },
    getters: {
        curatorsName: state => {
            let curators = state.curators;
            let curatorsName = [];
            for (let i = 0; i < curators.length; i++) {
                let name = curators[i].name;
                let nameExists = state.selectedCurators.find(
                    x => x.name == name
                );
                if (!nameExists) {
                    curatorsName.push(name);
                }
            }
            return curatorsName;
        },
        selectedCuratorsName: state => {
            let curators = state.selectedCurators;
            let curatorsName = [];
            state.selectedCuratorsName = '';
            for (let i = 0; i < curators.length; i++) {
                curatorsName.push(curators[i].name);
                state.selectedCuratorsName += curators[i].name + ' | ';
            }
            return curatorsName;
        }
    },
    mutations: {
        setCurators(state, curators) {
            state.curators = curators;
        },
        setSelectedCurator(state, curator) {
            state.selectedCurator = curator;
        },
        addCurator(state) {
            state.selectedCurators.push(state.selectedCurator);
        },
        deleteCurator(state, curator) {
            var index = state.selectedCurators.findIndex(x => x.name == curator);
            state.selectedCurators.splice(index, 1)
        }
    },
    actions: {
        getCurators({ commit }, curator) {
            if (curator != '') {

                ipcRenderer.send('getCurators', curator)
                ipcRenderer.on('curators', (event, receivedCurators) => {
                    commit('setCurators', receivedCurators)
                });
            } else {
                let empty = [];
                commit('setCurators', empty)
            }
        },
        setSelectedCurator({ state, commit }, curator) {
            let curatorExists = state.curators.find(
                x => x.name == curator.name
            );
            if (curatorExists) {
                commit("setSelectedCurator", curatorExists);
            } else {
                commit("setSelectedCurator", curator);
            }
        },
        addCurator({ state, commit }) {
            commit("addCurator");
            commit("setSelectedCurator", { name: null });
        }
    }
}

export default curator;