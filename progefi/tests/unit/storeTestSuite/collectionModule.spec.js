import Collection from '@/presentation/models/collection.js'
import collectionState from '@/presentation/store/modelStore/collection.js'
const mutations = collectionState.mutations
const actions = collectionState.actions

describe('collection vuex module', () => {
  let state
  let collection = new Collection()
  let collection2 = new Collection()
  let collection3 = new Collection()
  let collections = [collection, collection2, collection3]

  beforeEach(() => {
    state = {
      collection: null,
      collections: []
    }
  })

  it('mutation set collection', () => {
    mutations.setCollection(state, collection)
    expect(state.collection).toBe(collection)
  })

  it('mutation set collections', () => {
    mutations.setCollections(state, collections)
    expect(state.collections).toBe(collections)
  })

  it('reset collection vuex module fields', () => {
    mutations.setCollection(state, collection)
    mutations.resetStore(state)
    expect(state.collection).toStrictEqual(new Collection())
  })

  it('action set collection', async () => {
    const commit = jest.fn()
    await actions.setCollection({ commit }, collection)
    expect(commit).toHaveBeenCalledWith('setCollection', collection)
  })
})
