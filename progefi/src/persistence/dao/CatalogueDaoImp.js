'use strict'

const Catalogue = require('../models/Catalogue')

class CatalogueDaoImp {
    async getCatalogues(collectionId) {
        const catalogues = await Catalogue.query().where('collection_id', collectionId);
        console.log('collecciones: ' + catalogues)
        return catalogues;
    }
}

export default CatalogueDaoImp;