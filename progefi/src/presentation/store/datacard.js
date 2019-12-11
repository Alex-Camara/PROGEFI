const { ipcRenderer } = require('electron')
const fs = require('fs')
var moment = require('moment')

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
    setPhotoCollectURL (state, photoCollectPath) {
      state.photoCollect.photoCollectPath = photoCollectPath
    },
    setPhotoCollect (state, photoCollect) {
      state.photoCollect = {
        name: photoCollect.name,
        path: photoCollect.path,
        type: photoCollect.type,
        loading: false,
        changed: false
      }
    },
    setPhotoCollectNull (state) {
      state.photoCollect = {
        name: null,
        path: null,
        url: null,
        loading: false
      }
    },
    setCollectDate (state, collectDate) {
      state.datacard.collectDate.value = collectDate
      state.datacard.collectDate.required = state.datacard.collectDate.required
      state.datacard.collectDate.valid = { isValid: true, message: null }
      state.datacard.collectDate.formattedDate = moment(collectDate).format('DD/MM/YYYY')
      state.datacard.collectDate.formattedHour = moment(collectDate).format('HH:mm')
    },
    restoreMetadataValue (state, { attribute, metadataValue }) {
      state[attribute] = metadataValue
    }
  },
  actions: {
    setPhotoCollect ({ commit, state }, photoCollect) {
      if (photoCollect != null) {
        commit('setPhotoCollect', photoCollect)

        ipcRenderer.send('savePhotoCollect', state.photoCollect)
        commit('isLoading', true)

        // Si se guardó, actualizar la url de la imagen
        ipcRenderer.on('photoCollectSaved', (event, arg) => {
          commit('setPhotoCollectURL', arg)
          commit('isLoading', false)
          commit('hasChanged', true)
        })

        ipcRenderer.on('photoCollectNotSaved', (event, arg) => {
          commit('setPhotoCollectURL', arg)
          commit('isLoading', false)
          commit('hasChanged', false)
        })
      }
    },
    resetPhotoCollect ({ commit }) {
      commit('setActiveStep', 0)
      commit('setPhotoCollectNull')
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
    restoreMetadataValue ({ commit }, { attribute, metadataValue }) {
      switch (attribute) {
        case 'collectHour':
          commit('setCollect', 0)
          break

        default:
          commit('setActiveStep', 0)
          break
      }
    }
  }
}

export default datacard
