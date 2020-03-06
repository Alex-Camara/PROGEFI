"use strict";
import CatalogueDAO from '../../persistence/dao/CatalogueDao'

class CatalogueHandler {
    constructor(){
        this.catalogueDao = new CatalogueDAO()
    }
    async getCatalogues(collectionId, result) {
        let catalogues = await this.catalogueDao.getCatalogues(collectionId);
        result(catalogues);
    }
    async getAllCatalogues(result) {
        let catalogues = await this.catalogueDao.getAllCatalogues();
        result(catalogues);
    }
    async createCatalogue(catalogue, result){
        let createdCatalogue = await this.catalogueDao.createdCatalogue(catalogue);
        result(createdCatalogue);
    }
}

export default CatalogueHandler;