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
    async deleteCatalogue(catalogueId, result){
        let deletedCatalogue = await this.catalogueDao.deleteCatalogue(catalogueId);
        result(deletedCatalogue);
    }
    async updateCatalogue(catalogue, result){
        let updatedCatalogue = await this.catalogueDao.update(catalogue);
        result(updatedCatalogue);
    }
}

export default CatalogueHandler;