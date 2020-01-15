const { ipcRenderer } = require('electron')
var moment = require('moment')
import Vue from 'vue'
import Datacard from '../../models/datacard'

const datacard = {
  namespaced: true,
  state: {
    datacard: new Datacard(),
    requiredValues: {
      collectDate: true
    }
  },
  mutations: {
    setCollectDate (state, collectDate) {
      state.datacard.setCollectDate(null)
      state.datacard.setCollectDate(collectDate)
    },
    setCollectDateValid (state, valid) {
      state.datacard.setCollectDateValid(valid)
    },
    setFormattedDate (state, formattedDate) {
      state.datacard.setFormattedDate(formattedDate)
    },
    setFormattedHour (state, formattedHour) {
      state.datacard.setFormattedHour(formattedHour)
    },
    resetStore (state) {
      Vue.set(state, 'datacard', new Datacard())
    }
  },
  actions: {
    setCollectDate ({ commit }, collectDate) {
      commit('setCollectDate', collectDate)
      commit('setCollectDateValid', { isValid: true, message: null })

      let formattedDate = moment(collectDate).format('DD/MM/YYYY')
      let formattedHour = moment(collectDate).format('HH:mm')

      commit('setFormattedDate', formattedDate)
      commit('setFormattedHour', formattedHour)
    },
    setCollectHour ({ state, commit, dispatch }, collectHour) {
      let collectDate = moment(state.datacard.getCollectDate())
      collectHour = moment(collectHour).format('HH:mm')
      collectHour = collectHour.split(':', 2)
      let hour = collectHour[0]
      let minutes = collectHour[1]
      collectDate = collectDate.set({ h: hour, m: minutes })
      collectDate = moment(collectDate).toDate()
      dispatch('setCollectDate', collectDate)
    },
    createDatacard ({}, datacard) {
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
