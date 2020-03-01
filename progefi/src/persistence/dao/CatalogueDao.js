'use strict'

import CatalogueDaoImp from '../daoImp/CatalogueDaoImp'

class CatalogueDao {
    constructor() {
        this.catalogueDaoImp = new CatalogueDaoImp();
    }
    getCatalogues(collectionId) {
        let catalogues = Promise.resolve(this.catalogueDaoImp.getCatalogues(collectionId))
        return catalogues;
    }
    getCatalogue(catalogueId){
        let catalogue = Promise.resolve(this.catalogueDaoImp.getCatalogue(catalogueId))
        return catalogue;
    }
}

export default CatalogueDao;