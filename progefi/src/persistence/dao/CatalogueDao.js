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
    getAllCatalogues(){
        let catalogues = Promise.resolve(this.catalogueDaoImp.getAllCatalogues())
        return catalogues;
    }
    createdCatalogue(catalogue){
        let createdCatalogue = Promise.resolve(this.catalogueDaoImp.createCatalogue(catalogue))
        return createdCatalogue;
    }
    deleteCatalogue(catalogueId){
        let deletedCatalogue = Promise.resolve(this.catalogueDaoImp.deleteCatalogue(catalogueId))
        return deletedCatalogue;
    }
}

export default CatalogueDao;