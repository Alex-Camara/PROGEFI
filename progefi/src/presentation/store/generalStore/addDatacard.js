const { ipcRenderer } = require('electron')

const addDatacard = {
  namespaced: true,
  state: {
    activeStep: 0,
    photoCollect: {
      name: null,
      filePath: null,
      loading: false,
      changed: false,
      photoCollectPath: null
    }
  },
  mutations: {
    setActiveStep (state, activeStep) {
      state.activeStep = activeStep
    },
    isLoading (state, status) {
      state.photoCollect.loading = status
    },
    hasChanged (state, status) {
      state.photoCollect.changed = status
    },
    hasMetadata (state, status) {
      state.photoCollect.hasMetadata = status
    },
    setPhotoCollectPath (state, { photoCollectPath, loading, changed }) {
      state.photoCollect.photoCollectPath = photoCollectPath
      state.photoCollect.loading = loading
      state.photoCollect.changed = changed
    },
    setPhotoCollectName (state, name) {
      state.photoCollect.name = name
    },
    setPhotoCollect (state, photoCollect) {
      state.photoCollect.name = photoCollect.name
      state.photoCollect.filePath = photoCollect.path
      state.photoCollect.type = photoCollect.type
      state.photoCollect.loading = false
      state.photoCollect.changed = false
      state.photoCollect.photoCollectPath = null
    }
  },
  actions: {
    setPhotoCollect ({ commit, state }, photoCollect) {
      if (photoCollect != null) {
        commit('setPhotoCollect', photoCollect)
        commit('isLoading', true)

        ipcRenderer.send('savePhotoCollect', state.photoCollect)

        // Si se guardó, actualizar la url de la imagen
        ipcRenderer.on('photoCollectSaved', (event, arg) => {
          commit('setPhotoCollectPath', {
            photoCollectPath: arg,
            loading: false,
            changed: true
          })
        })

        ipcRenderer.on('photoCollectNotSaved', (event, arg) => {
          commit('setPhotoCollectPath', {
            photoCollectPath: arg,
            loading: false,
            changed: false
          })
          commit('setPhotoCollectName', null)
        })
      }
    },
    resetAddDatacard ({ commit }) {
      commit('setActiveStep', 0)
      commit('setPhotoCollect', { name: null, type: null, path: null })
    }
  }
}

export default addDatacard
