'use strict'

const Catalogue = require('../models/Catalogue')
const Datacard = require('../models/Datacard')

class CatalogueDaoImp {
  async getCatalogues (collectionId) {
    const catalogues = await Catalogue.query().where(
      'collectionId',
      collectionId
    )

    for (let i = 0; i < catalogues.length; i++) {
      const catalogue = catalogues[i]
      catalogues[i].datacardCount = await this.countDatacardsInCatalog(catalogue.id)
    }
    return catalogues
  }
  async countDatacardsInCatalog (catalogueId) {
    const countResult = await Datacard.query()
      .count('catalogueId as count')
      .as('count')
      .where('catalogueId', catalogueId)
    return countResult[0].count
  }
}

export default CatalogueDaoImp
