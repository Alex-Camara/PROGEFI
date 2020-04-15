const { ipcRenderer } = require('electron')
import Vue from 'vue'
import Collection from '../../models/collection'

const collection = {
  namespaced: true,
  state: {
    // collections: [],
    collection: new Collection()
  },
  mutations: {
    // setCollections(state, collections) {
    // Vue.set(state, 'collections', collections)
    // },
    setCollection(state, collection) {
      collection.setValid({ isValid: true, message: null })
      Vue.set(state, 'collection', collection)
    },
    resetStore(state) {
      Vue.set(state, 'collection', new Collection())
    }
  },
  actions: {
    getCollection({ commit }) {
      return new Promise((resolve) => {

        ipcRenderer.send('getCollection')
        ipcRenderer.once('collection', (event, receivedCollection) => {
          let newCollection = new Collection()
          newCollection.setCollection(receivedCollection[0])
          commit('setCollection', newCollection)
          resolve(newCollection);
        })
      });
    },
    setCollection({ commit }, collection) {
      commit('setCollection', collection)
    }
  }
}

export default collection
