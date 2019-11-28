const {
    ipcRenderer
} = require('electron')

const location = {
    namespaced: true,
    state: {
        country: null,
        countryState: null,
        municipality: null,
        locality: null
    },
    mutations: {
        setCountry(state, country){
            state.country = country;
        },
        setCountryState(state, countryState){
            state.countryState = countryState;
        },
        setMunicipality(state, municipality){
            state.municipality = municipality;
        },
        setLocality(state, locality){
            state.locality = locality;
        }
    }
}

export default location;