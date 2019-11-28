const {
    ipcRenderer
} = require('electron')

const coordinate = {
    namespaced: true,
    state: {
        longitude: -101.433236,
        latitude: 20.102365,
        altitude: null,
        longitudeDMS: null,
        latitudeDMS: null,
    },
    mutations: {
        setLongitude(state, longitude) {
            state.longitude = longitude
        },
        setLatitude(state, latitude) {
            state.latitude = latitude
        },
        setAltitude(state, altitude) {
            state.altitude = altitude
        },
        restoreMetadataValue(state, { attribute, metadataValue }) {
            state[attribute] = metadataValue;

        }
        /*,
        getDMSValue(state, { coordinate, valueName }) {
            let degrees;
            let minutes;
            let seconds;
            coordinate = (coordinate).toString();

            degrees = coordinate.split(".")[0];
            let minutesDecimals = (('.' + coordinate.split(".")[1]) * 60).toString();
            minutes = minutesDecimals.split(".")[0];
            let secondsDecimals = (('.' + minutesDecimals.split(".")[1]) * 60).toString();
            seconds = secondsDecimals.split(".")[0];

            let valueDMS = degrees + ' ' + minutes + ' ' + seconds;

            state[valueName] = valueDMS;
        }*/
    },
    actions: {
        /*restoreMetadataValue({ commit }, { attribute, metadataValue }) {
            commit('restoreMetadataValue', { attribute, metadataValue });
            commit('getDMSValue', { coordinate: metadataValue, valueName: attribute + 'DMS' })
        },*/
        setLongitude({ commit }, longitude) {
            //if (isNaN(longitude)) {
                commit('setLongitude', longitude);
            //}
            //debugger;

            //commit('getDMSValue', { coordinate: longitude, valueName: 'longitudeDMS' })
        },
        setLatitude({ commit }, latitude) {
            commit('setLatitude', latitude);
            //commit('getDMSValue', { coordinate: latitude, valueName: 'latitudeDMS' })
        }
    }
}

export default coordinate;