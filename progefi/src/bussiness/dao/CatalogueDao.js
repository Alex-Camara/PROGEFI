'use strict'

import CatalogueDaoImp from '../../persistence/dao/CatalogueDaoImp'

class CatalogueDao {
    constructor() {
        this.catalogueDaoImp = new CatalogueDaoImp();
    }
    getCatalogues() {
        console.log('catalogue DAO')
        let catalogues = Promise.resolve(this.catalogueDaoImp.getCatalogues())
        return catalogues;
    }
}

export default CatalogueDao;