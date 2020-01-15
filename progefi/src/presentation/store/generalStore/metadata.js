const { ipcRenderer } = require('electron')
var moment = require('moment')

const metadata = {
  namespaced: true,
  state: {
    hasMetadata: false,
    device: null,
    model: null,
    collectDate: null,
    collectHour: null,
    formattedDate: null,
    formattedHour: null,
    longitude: null,
    latitude: null,
    altitude: null
  },
  mutations: {
    hasMetadata (state, status) {
      state.hasMetadata = status
    },
    setDevice (state, device) {
      state.device = device
    },
    setModel (state, model) {
      state.model = model
    },
    setCollectDate (state, collectDate) {
      state.formattedDate = moment(collectDate).format('DD/MM/YYYY')
      state.collectDate = collectDate
    },
    setCollectHour (state, collectHour) {
      state.formattedHour = moment(collectHour).format('HH:mm')
      state.collectHour = collectHour
    },
    setLongitude (state, longitude) {
      state.longitude = longitude
    },
    setLatitude (state, latitude) {
      state.latitude = latitude
    },
    setAltitude (state, altitude) {
      state.altitude = altitude
    },
    resetMetadata (state) {
      state.device = null
      state.model = null
      state.collectDate = null
      state.collectHour = null
      state.longitude = null
      state.latitude = null
      state.altitude = null
      state.hasMetadata = false
    }
  },
  actions: {
    getImageMetadata ({ commit, dispatch }) {
      ipcRenderer.send('getImageMetadata')
      ipcRenderer.on('imageMetadata', (event, arg) => {
        commit('hasMetadata', true)
        commit('addDatacard/hasChanged', false, { root: true })
        dispatch('setMetadata', arg)
        dispatch('setDeviceMetadata', arg)
        dispatch('setDatacardMetadata', arg)
      })

      ipcRenderer.on('imageMetadataFailed', (event, arg) => {
        commit('hasMetadata', false)
        commit('addDatacard/hasChanged', false, { root: true })
      })
    },
    setMetadata ({ commit }, arg) {
      commit('setDevice', arg.device)
      commit('setModel', arg.model)

      let date = moment(arg.collectDate).format('YYYY-MM-DD[T]HH:mm:ss')
      date = moment(date).toDate()
      commit('setCollectDate', date)
      commit('setCollectHour', arg.collectHour)
      commit('setLongitude', arg.longitude)
      commit('setLatitude', arg.latitude)
      commit('setAltitude', arg.altitude)
    },
    setDeviceMetadata ({ commit, dispatch }, arg) {
      dispatch('device/setDevice', arg.device, { root: true })
      dispatch('device/setModel', arg.model, { root: true })
    },
    setDatacardMetadata ({ commit, dispatch }, arg) {
      let date = moment(arg.collectDate).format('YYYY-MM-DD[T]HH:mm:ss')
      date = moment(date).toDate()
      commit('datacard/setCollectDate', date, { root: true })
      dispatch('datacard/setCollectHour', arg.collectHour, { root: true })
      dispatch('coordinate/setAltitude', arg.altitude, { root: true })
      if (arg.latitude != null && arg.longitude != null) {
        dispatch('coordinate/setLongitude', arg.longitude, { root: true })
        dispatch('coordinate/setLatitude', arg.latitude, { root: true })
      }
    }
  }
}

export default metadata
