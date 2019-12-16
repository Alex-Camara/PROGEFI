const { ipcRenderer } = require('electron')
const fs = require('fs')
var moment = require('moment')

const datacard = {
  namespaced: true,
  state: {
    activeStep: 0,
    photoCollect: {
      name: null,
      filePath: null,
      loading: false,
      changed: false,
      photoCollectPath: null
    },
    datacard: {
      collectDate: {
        value: null,
        formattedDate: null,
        formattedHour: null,
        required: true,
        valid: {
          isValid: false,
          message: 'campo requerido'
        }
      },
      collectHour: {
        name: null,
        formattedHour: null
      }
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
    },
    setCollectDate (state, collectDate) {
      state.datacard.collectDate.value = collectDate
      state.datacard.collectDate.required = state.datacard.collectDate.required
      state.datacard.collectDate.valid = { isValid: true, message: null }
      state.datacard.collectDate.formattedDate = moment(collectDate).format(
        'DD/MM/YYYY'
      )
      state.datacard.collectDate.formattedHour = moment(collectDate).format(
        'HH:mm'
      )
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
    // Método invocado al salir del CU agregar ficha (es un reset de los campos involucrados)
    resetPhotoCollect ({ commit }) {
      commit('setActiveStep', 0)
      commit('setPhotoCollect', { name: null, type: null, path: null })
    },
    setCollectHour ({ state, commit }, collectHour) {
      let collectDate = moment(state.datacard.collectDate.value)
      collectHour = moment(collectHour).format('HH:mm')
      // state.datacard.formattedHour = collectHour
      collectHour = collectHour.split(':', 2)
      let hour = collectHour[0]
      let minutes = collectHour[1]
      collectDate = collectDate.set({ h: hour, m: minutes })
      collectDate = moment(collectDate).toDate()
      commit('setCollectDate', collectDate)
      // state.datacard.collectDate.value = moment(collectDate).toDate()
    },
    createDatacard ({ }, datacard) {
      return new Promise((resolve, reject) => {
        ipcRenderer.send('createDatacard', datacard)
        ipcRenderer.on('datacardCreated', event => {
          resolve()
        })
      })
    }
  }
}

export default datacard
