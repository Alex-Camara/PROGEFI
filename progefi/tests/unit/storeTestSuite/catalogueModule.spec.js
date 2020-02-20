import Catalogue from '@/presentation/models/catalogue.js'
import catalogueState from '@/presentation/store/modelStore/catalogue.js'
const mutations = catalogueState.mutations
const actions = catalogueState.actions

describe('catalogue vuex module', () => {
  it('mutation set catalogue', () => {
    let catalogue = new Catalogue()
    const state = {
      catalogue: null
    }

    mutations.setCatalogue(state, catalogue)
    expect(state.catalogue).toBe(catalogue)
  })
  it('mutation set catalogues', () => {
    let catalogue1 = new Catalogue()
    let catalogue2 = new Catalogue()
    let catalogue3 = new Catalogue()
    let catalogues = [catalogue1, catalogue2, catalogue3]
    const state = {
      catalogues: []
    }

    mutations.setCatalogues(state, catalogues)
    expect(state.catalogues).toBe(catalogues)
  })
})
