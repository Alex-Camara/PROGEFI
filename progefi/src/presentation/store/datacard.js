const { ipcRenderer } = require('electron')

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

            //Guardar imagen
            ipcRenderer.send('savePhotoCollect', state.photoCollect)

            //Si se guardó, actualizar la url de la imagen
            ipcRenderer.on('savePhotoCollectSuccess', (event, arg) => {
                /*state.photoCollect = {
                    path: arg
                };*/
            })
            ipcRenderer.on('savePhotoCollectError', (event, arg) => {
                console.log('error: ' + arg)
            })
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
            commit
        }, photoCollect) {
            if (photoCollect != null) {
                commit('setPhotoCollect', photoCollect);
                commit('setPhotoCollectURL', photoCollect);
            }
        },
        resetPhotoCollect({
            commit
        }) {
            commit("changeActiveStep", 0);
            commit("setPhotoCollectNull");
        }
    }
}

export default datacard;