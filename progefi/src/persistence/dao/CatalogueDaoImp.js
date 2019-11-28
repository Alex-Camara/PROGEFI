'use strict'

const Catalogue = require('../models/Catalogue')

class CatalogueDaoImp {
    async getCatalogues(collectionId) {
        const catalogues = await Catalogue.query().where('collectionId', collectionId);
        return catalogues;
    }
}

export default CatalogueDaoImp;