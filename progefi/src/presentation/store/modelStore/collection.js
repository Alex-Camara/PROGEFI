const { ipcRenderer } = require('electron')
import Vue from 'vue'
import Collection from '../../models/collection'

const collection = {
  namespaced: true,
  state: {
    collections: [],
    collection: new Collection()
  },
  mutations: {
    setCollections (state, collections) {
      Vue.set(state, 'collections', collections)
    },
    setCollection (state, collection) {
      collection.setValid({ isValid: true, message: null })
      Vue.set(state, 'collection', collection)
    },
    resetStore (state) {
      Vue.set(state, 'collection', new Collection())
    }
  },
  actions: {
    getCollections ({ commit }) {
      ipcRenderer.send('getCollections')
      ipcRenderer.on('collections', (event, receivedCollections) => {
        let newCollections = []
        for (let i = 0; i < receivedCollections.length; i++) {
          let collection = new Collection()
          collection.setCollection(receivedCollections[i])
          newCollections.push(collection)
        }
        commit('setCollections', newCollections)
      })
    },
    setCollection ({ commit, dispatch }, collection) {
      commit('setCollection', collection)
    }
  }
}

export default collection
