const {
    ipcRenderer
} = require('electron')

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
            console.log('nombre 2: ' + state.photoCollect.name)
            //Guardar imagen
            ipcRenderer.send('savePhotoCollect', state.photoCollect)
            console.log('nombre 3: ' + state.photoCollect.name)
            //Si se guardó, actualizar la url de la imagen
            ipcRenderer.on('savePhotoCollectSuccess', (event, arg) => {
                /*state.photoCollect = {
                    path: arg
                };*/
                console.log('nombre 4: ' + state.photoCollect.name)
            })
            ipcRenderer.on('savePhotoCollectError', (event, arg) => {
                console.log('error: ' + arg)
            })
            console.log('nombre 5: ' + state.photoCollect.name)
        },
        setPhotoCollectNull(state) {
            console.log('entró a null')
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