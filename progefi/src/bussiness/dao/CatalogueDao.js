'use strict'

import CatalogueDaoImp from '../../persistence/dao/CatalogueDaoImp'

class CatalogueDao {
    constructor() {
        this.catalogueDaoImp = new CatalogueDaoImp();
    }
    getCatalogues(collectionId) {
        let catalogues = Promise.resolve(this.catalogueDaoImp.getCatalogues(collectionId))
        return catalogues;
    }
}

export default CatalogueDao;