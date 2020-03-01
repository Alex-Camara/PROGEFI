'use strict';
import CollectionDaoImp from './CollectionDaoImp'

const Catalogue = require('../models/Catalogue');
const Datacard = require('../models/Datacard');
const Collection = require('../models/Collection');

class CatalogueDaoImp {
  constructor() {
    this.collectionDaoImp = new CollectionDaoImp();
  }
  async getCatalogues(collectionId) {
    const catalogues = await Catalogue.query().where(
      'collectionId',
      collectionId
    );

    for (let i = 0; i < catalogues.length; i++) {
      const catalogue = catalogues[i];
      catalogues[i].datacardCount = await this.countDatacardsInCatalog(
        catalogue.id
      );
    }
    return catalogues;
  }
  async getCatalogue(catalogueId) {
    const catalogue = await Catalogue.query()
      .where('id', catalogueId);

    let collection = await this.collectionDaoImp.getCollection(catalogue[0].collectionId)
    catalogue[0].collection = collection

    return catalogue[0]
  }
  async countDatacardsInCatalog(catalogueId) {
    const countResult = await Datacard.query()
      .count('catalogueId as count')
      .as('count')
      .where('catalogueId', catalogueId);
    return countResult[0].count;
  }
}

export default CatalogueDaoImp;