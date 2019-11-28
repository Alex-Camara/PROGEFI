const {
    ipcRenderer
} = require('electron')

const collector = {
    namespaced: true,
    state: {
        collectors: [],
        collector: {
            name: null
        }
    },
    getters: {
        collectorsName: state => {
            let collectors = state.collectors;
            let collectorsName = [];
            for (let i = 0; i < collectors.length; i++) {
                collectorsName.push(collectors[i].name);
            }
            return collectorsName;
        }
    },
    mutations: {
        setCollectors(state, collectors) {
            state.collectors = collectors;
        },
        setCollector(state, collector) {
            if (collector.hasOwnProperty('id')) {
                state.collector = {
                    id: collector.id,
                    name: collector.name
                };
            } else {
                state.collector.name = collector;
            }

        }
    },
    actions: {
        getCollectors({
            commit
        }, collector) {
            commit('setCollector', collector)
            if (collector != '') {
                ipcRenderer.send('getCollectors', collector)
                ipcRenderer.on('collectors', (event, receivedCollectors) => {
                    commit('setCollectors', receivedCollectors)
                });
            } else {
                let empty = [];
                commit('setCollectors', empty)
            }
        }
    }
}

export default collector;