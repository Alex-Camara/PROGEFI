const {
    ipcRenderer
} = require('electron')

const speciesData = {
    namespaced: true,
    state: {
        scientificName: null,
        commonName: null,
        genus: null,
        order: null,
        family: null,
        speciesClass: null,
        phylum: null,
        kingdom: null,
        sex: {
            name: null
        },
        lifeStage: {
            name: null
        },
        lifeStages: [],
        sexes: []
    },
    mutations: {
        setScientificName(state, scientificName) {
            state.scientificName = scientificName;
        },
        setCommonName(state, commonName) {
            state.commonName = commonName;
        },
        setGenus(state, genus) {
            state.genus = genus;
        },
        setOrder(state, order) {
            state.order = order;
        },
        setFamily(state, family) {
            state.family = family
        },
        setSpeciesClass(state, speciesClass) {
            state.speciesClass = speciesClass
        },
        setPhylum(state, phylum) {
            state.phylum = phylum
        },
        setKingdom(state, kingdom) {
            state.kingdom = kingdom
        },
        setSex(state, sex) {
            state.sex = sex;
        },
        setLifeStage(state, lifeStage) {
            state.lifeStage = lifeStage;
        },
        setSexes(state, sexes) {
            state.sexes = sexes;
        },
        setLifeStages(state, lifeStages) {
            state.lifeStages = lifeStages;
        }
    },
    actions: {
        getSexes({
            commit
        }) {
            ipcRenderer.send('getSexes')
            ipcRenderer.on('sexes', (event, receivedSexes) => {
                commit('setSexes', receivedSexes)
            });
        },
        getLifeStages({
            commit
        }) {
            ipcRenderer.send('getLifeStages')
            ipcRenderer.on('lifeStages', (event, receivedLifeStages) => {
                commit('setLifeStages', receivedLifeStages)
            });
        }
    }
}

export default speciesData;