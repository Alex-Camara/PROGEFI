const {
    ipcRenderer
} = require('electron')
const fs = require('fs')

const datacard = {
    namespaced: true,
    state: {
        activeStep: 0,
        photoCollect: {
            name: null,
            path: null,
            url: null,
            loading: false,
            changed: false,
            hasMetadata: null
        },
        datacard: {
            longitude: -101.433236,
            latitude: 20.102365,
            altitude: null
        }
    },
    mutations: {
        setActiveStep(state, activeStep) {
            state.activeStep = activeStep
        },
        isLoading(state, status) {
            state.photoCollect.loading = status;
        },
        hasChanged(state, status) {
            state.photoCollect.changed = status;
        },
        hasMetadata(state, status) {
            state.photoCollect.hasMetadata = status;
        },
        setPhotoCollectURL(state, photoCollect) {
            var reader = new FileReader();

            reader.onloadend = () => {
                state.photoCollect = {
                    name: state.photoCollect.name,
                    path: state.photoCollect.path,
                    url: reader.result,
                    loading: false,
                    changed: true,
                    hasMetadata: null
                }
            };
            reader.readAsDataURL(photoCollect);
        },
        setPhotoCollect(state, photoCollect) {
            state.photoCollect = {
                "name": photoCollect.name,
                "path": photoCollect.path,
                "type": photoCollect.type,
                loading: false,
                changed: false,
                "hasMetadata": null
            };
        },
        setPhotoCollectNull(state) {
            state.photoCollect = {
                name: null,
                path: null,
                url: null,
                loading: false,
                hasMetadata: null
            }
        },
        setLongitude(state, longitude) {
            state.datacard.longitude = longitude
        },
        setLatitude(state, latitude) {
            state.datacard.latitude = latitude
        }
    },
    actions: {
        setPhotoCollect({
            dispatch,
            commit,
            state
        }, photoCollect) {
            if (photoCollect != null) {
                commit('setPhotoCollect', photoCollect);

                ipcRenderer.send('savePhotoCollect', state.photoCollect)
                commit("isLoading", true)

                //Si se guardó, actualizar la url de la imagen
                ipcRenderer.on('photoCollectSaved', (event, arg) => {
                    try {
                        console.log('valor entrante: ' + arg)
                        var fileReceived = fs.readFileSync(arg)
                        var imageFile = new File([fileReceived], 'filename')
                        commit('setPhotoCollectURL', imageFile);
                    } catch (error) {
                        commit("isLoading", false)
                        throw error;
                    }
                })

                ipcRenderer.on('photoCollectNotSaved', (event, arg) => {
                    state.photoCollect = {
                        name: state.photoCollect.name,
                        path: state.photoCollect.path,
                        url: arg,
                        loading: false
                    }
                })
            }
        },
        resetPhotoCollect({
            commit
        }) {
            commit("setActiveStep", 0);
            commit("setPhotoCollectNull");
        },
        getImageMetadata({
            commit,
            state
        }) {
            ipcRenderer.send('getImageMetadata')
            ipcRenderer.on('imageMetadata', (event, arg) => {
                state.datacard = arg;
                commit("hasMetadata", true);
                commit("hasChanged", false);
            })

            ipcRenderer.on('imageMetadataFailed', (event, arg) => {
                commit("hasMetadata", false);
                commit("hasChanged", false);
            })
        }
    }
}

export default datacard;