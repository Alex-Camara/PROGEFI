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
            url: null
        },
        url: null
    },
    mutations: {
        changeActiveStep(state, activeStep) {
            state.activeStep = activeStep
        },
        setPhotoCollectURL(state, photoCollect) {
            var reader = new FileReader();

            reader.onloadend = function () {
                state.photoCollect = {
                    name: state.photoCollect.name,
                    path: state.photoCollect.path,
                    url: reader.result
                }
            };
            reader.readAsDataURL(photoCollect);
        },
        setPhotoCollect(state, photoCollect) {
            state.photoCollect = {
                "name": photoCollect.name,
                "path": photoCollect.path,
                "type": photoCollect.type
            };
        },
        setPhotoCollectNull(state) {
            state.photoCollect = {
                name: null,
                path: null,
                url: null
            }
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
                console.log('enviado una vez ')

                //Si se guardó, actualizar la url de la imagen
                ipcRenderer.on('photoCollectSaved', (event, arg) => {
                    try {
                        console.log('valor entrante: ' + arg)
                        var fileReceived = fs.readFileSync(arg)
                        var imageFile = new File([fileReceived], 'filename')
                        commit('setPhotoCollectURL', imageFile);
                        //dispatch('getImageMetadata')
                    } catch (error) {
                        throw error;
                    }
                })
                
                ipcRenderer.on('photoCollectNotSaved', (event, arg) => {
                    console.log('valor entrante erroneo: ' + arg) 
                    state.photoCollect = {
                        name: state.photoCollect.name,
                        path: state.photoCollect.path,
                        url: arg
                    }
                })
            }
        },
        resetPhotoCollect({
            commit
        }) {
            commit("changeActiveStep", 0);
            commit("setPhotoCollectNull");
        },
        getImageMetadata({
            commit
        }) {
            ipcRenderer.send('getImageMetadata')
        }
    }
}

export default datacard;