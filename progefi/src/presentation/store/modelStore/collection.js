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
    setCollections(state, collections) {
      Vue.set(state, 'collections', collections)
    },
    setCollection(state, collection) {
      collection.setValid({ isValid: true, message: null })
      Vue.set(state, 'collection', collection)
    },
    resetStore(state) {
      Vue.set(state, 'collection', new Collection())
    }
  },
  actions: {
    getCollections({ state, commit }) {
      return new Promise((resolve) => {

        ipcRenderer.send('getCollections')
        ipcRenderer.once('collections', (event, receivedCollections) => {
          let newCollections = []
          for (let i = 0; i < receivedCollections.length; i++) {
            let newCollection = new Collection()
            newCollection.setCollection(receivedCollections[i])
            newCollections.push(newCollection)
          }
          commit('setCollections', newCollections)

          // Para ubicar la coleccion ya seleccionada dentro de la lista de colecciones
          // recuperadas
          if (state.collection.id != null) {
            let selectedCollection = newCollections.find(
              x => x.id == state.collection.getId()
            )
            commit('setCollection', selectedCollection)
          }
          resolve();
        })
      });
    },
    setCollection({ commit }, collection) {
      commit('setCollection', collection)
    }
  }
}

export default collection
